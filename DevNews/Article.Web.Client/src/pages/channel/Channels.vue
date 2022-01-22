<template>
  <div>
    <v-card class="mx-auto" elevation="5" tile>
      <v-col cols="12">
        <v-text-field outlined placeholder="Search" label="Search" />
      </v-col>
    </v-card>
    <br />
    <v-card class="max-auto" elevation="5" tile>
      <v-list rounded>
        <v-tabs color="deep-purple accent-4" fixed-tabs>
          <v-tab>All Channels</v-tab>
          <v-tab>My Channels</v-tab>

          <v-tab-item>
            <channel-list :channels="allChannels" />
          </v-tab-item>
          <v-tab-item>
            <channel-list :channels="myChannels" />
          </v-tab-item>
        </v-tabs>
      </v-list>
    </v-card>
    <v-col>
      <v-btn elevation="5" fab color="primary" @click="newChannel">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <app-dialog title="Create New Channel">
      <template slot="body">
        <NewChannel @channelCreated="channelCreated" />
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import Vue from "vue";
import ChannelService from "@/api/service/channel.service";
import { messages } from "@/constants";
import { showMessage } from "@/services/message";
import ChannelList from "@/components/channel/ChannelList.vue";
import NewChannel from "@/components/channel/NewChannel.vue";
import AppDialog from "@/components/core/AppDialog.vue";

export default Vue.extend({
  components: { ChannelList, NewChannel, AppDialog },
  data: () => ({
    selectedItem: 1,
    allChannels: [],
    myChannels: [],
    channelService: new ChannelService(apiCall),
  }),
  mounted() {
    this.getChannels();
    this.getMyChannels();
  },
  methods: {
    getChannels() {
      (this.$root.$refs.loading as any).open();
      this.channelService
        .getChannels()
        .then((res) => {
          if (res.status) this.allChannels = res.result;
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).title);
        });
    },
    getMyChannels() {
      (this.$root.$refs.loading as any).open();
      this.channelService
        .getMyChannels()
        .then((res) => {
          if (res.status) {
            this.myChannels = res.result;            
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).title);
        });
    },
    newChannel() {
      (this.$root.$refs.dialog as any).open();
    },
    channelCreated(channel: any) {
      (this.$root.$refs.dialog as any).close();
      this.myChannels.push(channel as never);
      this.allChannels.push(channel as never);
    },
  },
});
</script>