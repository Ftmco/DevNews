<template>
  <div>
    <channel-bar :channel="channel" />
    <v-col cols="12">
      <v-row>
        <item v-for="(post, i) in posts" :key="i" :item="post" />
      </v-row>
    </v-col>
    <br />
    <v-footer fixed height="75">
      <v-col align="center" cols="12" v-if="!isIn">
        <v-btn block text @click="followChannel">
          Follow Channel
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="12" @click="mute" v-else-if="!isAdmin">
        {{ notift }}
      </v-col>
      <v-col cols="12" v-else-if="isAdmin">
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
          @click:append="sendMessage"
          @click:append-outer="more"
        ></v-textarea>
      </v-col>
    </v-footer>
    <bottom-sheet
      title="Channel Items"
      :items="channelItems"
      :component="component"
      @event="eventSheet"
    />
    <app-dialog :title="dTitle" :titleColor="dColor">
      <template v-slot:body>
        <component :is="component" v-bind="properties" @submit="itemSubmit" />
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import ChannelBar from "@/components/channel/ChannelBar.vue";
import Item from "@/components/article/Item.vue";
import Vue from "vue";
import ChannelService from "@/api/service/channel.service";
import ArticleLoading from "@/components/article/ArticleList.vue";
import { apiCall } from "@/api";
import { closeDialog, openDialog, showMessage } from "@/services/message";
import { channelItems, messages } from "@/constants";
import BottomSheet from "@/components/core/BottomSheet.vue";
import AppDialog from "@/components/core/AppDialog.vue";
import SendFile from "@/components/post/SendFile.vue";
export default Vue.extend({
  components: {
    Item,
    ChannelBar,
    BottomSheet,
    ArticleLoading,
    AppDialog,
    SendFile,
  },
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
    posts: [],
    loadingPost: true,
    isAdmin: false,
    notift: "Mute",
    isIn: true,
    message: "",
    marker: false,
    token: "",
    component: SendFile,
    properties: {},
    dTitle: "",
    dColor: "primary",
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
      this.token = this.$route.query.token.toString();
      this.channleService
        .getChannel(this.token)
        .then((res) => {
          if (res.status) {
            this.channel = res.result.channel;
            this.owner = res.result.owner;
            this.isAdmin = res.result.isAdmin;
            this.isIn = res.result.isIn;
            this.getChannelPosts();
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).title);
        });
    },
    getChannelPosts() {
      (this.$root.$refs.loading as any).open();
      this.channleService
        .getChannelPosts(this.token)
        .then((res) => {
          if (res.status) {
            res.result.posts.forEach((post: never) => {
              this.posts.push(post);
            });
            res.result.articles.forEach((post: never) => {
              this.posts.push(post);
            });
          }
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).message);
        });
    },
    more() {
      (this.$root.$refs.bottomSheet as any).open();
    },
    sendMessage() {
      this.channleService
        .sendMessage({
          message: this.message,
          token: this.token,
          file: null,
        })
        .then((res) => {
          if (res.status) {
            this.posts.push(res.result as never);
            this.message = "";
          }
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).message);
        });
    },
    eventSheet(env: any) {
      switch (env.item.id) {
        case 0:
          this.dTitle = "Send File";
          this.dColor = "primary";
          this.component = SendFile;
          this.properties = {
            type: env.item.id,
          };
          openDialog(this);
        case 1:
          this.dTitle = "Send File";
          this.dColor = "primary";
          this.component = SendFile;
          this.properties = {
            type: env.item.id,
          };
          openDialog(this);
      }
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
    itemSubmit(model: any) {
      this.channleService
        .sendMessage({
          message: model.message,
          token: this.token,
          file: model.base64,
        })
        .then((res) => {
          if (res.status) {
            this.posts.push(res.result as never);
            closeDialog(this);
          }
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).message);
        });
    },
  },
});
</script>