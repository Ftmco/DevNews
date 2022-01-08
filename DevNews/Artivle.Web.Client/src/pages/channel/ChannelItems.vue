<template>
  <div>
    <channel-bar :channel="channel" />
    <v-col cols="12">
      <v-row>
        <item v-for="i in 20" :key="i" />
      </v-row>
    </v-col>
    <br />
    <v-footer fixed height="75">
      <v-col align="center" fixed cols="12" v-if="!isIn">
        <v-btn block text @click="followChannel">
          Follow Channel
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="12" @click="mute" v-else-if="!isAdmin">
        {{ notift }}
      </v-col>
      <v-col fixed cols="12" v-else-if="isAdmin">
        <v-textarea
          block
          v-model="message"
          append-icon="mdi-send"
          append-outer-icon="mdi-chevron-up"
          clear-icon="mdi-close-circle"
          hide-details=""
          clearable
          label="Message"
          type="text"
          rows="1"
          @click:append-outer="more"
        ></v-textarea>
      </v-col>
    </v-footer>
    <bottom-sheet title="Channel Items" :items="channelItems" />
  </div>
</template>

<script lang="ts">
import ChannelBar from "@/components/channel/ChannelBar.vue";
import Item from "@/components/article/Item.vue";
import Vue from "vue";
import ChannelService from "@/api/service/channel.service";
import { apiCall } from "@/api";
import { showMessage } from "@/services/message";
import { channelItems, messages } from "@/constants";
import BottomSheet from "@/components/core/BottomSheet.vue";
export default Vue.extend({
  components: { Item, ChannelBar, BottomSheet },
  data: () => ({
    channel: {
      name: "",
      avatar: "",
      mute: true,
      token: "",
    },
    owner: {
      avata: "",
      email: "",
      token: "",
      userName: "",
    },
    channelItems: channelItems,
    isAdmin: false,
    notift: "Mute",
    isIn: true,
    message: "",
    marker: false,
    channleService: new ChannelService(apiCall),
  }),
  mounted() {
    window.scrollTo(0, 99999);
    this.getChannel();
  },
  methods: {
    mute() {
      this.channel.mute = !this.channel.mute;
      this.notift = this.channel.mute ? "Mute" : "UnMute";
    },
    getChannel() {
      let token = this.$route.query.token.toString();
      this.channleService
        .getChannel(token)
        .then((res) => {
          if (res.status) {
            this.channel = res.result.channel;
            this.owner = res.result.owner;
            this.isAdmin = res.result.isAdmin;
            this.isIn = res.result.isIn;
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).title);
        });
    },
    more() {
      (this.$root.$refs.bottomSheet as any).open();
    },
    followChannel() {
      this.channleService
        .followChannel(this.channel.token)
        .then((res) => {
          if (res.status) {
            this.isIn = true;
            this.isAdmin = false;
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).title);
        });
    },
  },
});
</script>