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
        <component
          :is="component"
          v-bind="properties"
          @submit="itemSubmit"
          @createArticle="createArticle"
        />
      </template>
    </app-dialog>
    <channnel-info
      color="info"
      :owner="owner"
      :channel="channel"
      :title="channel.name"
    />
  </div>
</template>

<script lang="ts">
import ChannelBar from "@/components/channel/ChannelBar.vue";
import Item from "@/components/article/Item.vue";
import Vue from "vue";
import ChannelService from "@/api/service/channel.service";
import ArticleLoading from "@/components/article/ArticleList.vue";
import { apiCall } from "@/api";
import {
  closeDialog,
  loading,
  openDialog,
  showMessage,
} from "@/services/message";
import { channelItems, channelItemTypes, messages } from "@/constants";
import BottomSheet from "@/components/core/BottomSheet.vue";
import AppDialog from "@/components/core/AppDialog.vue";
import SendFile from "@/components/post/SendFile.vue";
import UpsertArticle from "@/components/article/UpsertArticle.vue";
import ArticleService from "@/api/service/article.service";
import { ArticleOwnerType } from "@/api/models/article.model";
import ChannnelInfo from "@/components/channel/ChannelInfo.vue";

export default Vue.extend({
  components: {
    Item,
    ChannelBar,
    BottomSheet,
    ArticleLoading,
    AppDialog,
    SendFile,
    UpsertArticle,
    ChannnelInfo,
  },
  data: () => ({
    channel: {
      name: "",
      avatar: [],
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
    articleService: new ArticleService(apiCall),
  }),
  mounted() {
    this.getChannel();
    window.scrollTo(0, 9999);
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
      switch (env.item.type) {
        case channelItemTypes.File:
          this.openDialogApp("primary", "Send File", SendFile, {
            type: env.item.type,
          });
        case channelItemTypes.Image:
          this.openDialogApp("primary", "Send Image", SendFile, {
            type: env.item.type,
          });
        case channelItemTypes.Article:
          this.openDialogApp("info", "Create Article", UpsertArticle, {
            type: env.item.type,
          });
      }
    },
    openDialogApp(color: string, title: string, component: any, props: any) {
      this.dTitle = title;
      this.dColor = color;
      this.component = component;
      this.properties = props;
      openDialog(this);
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
          file: model.file,
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
    createArticle(article: any) {
      loading(this);
      this.articleService
        .createArticle({
          ...article,
          channelToken: this.token,
          ownerType: ArticleOwnerType.Channel,
        })
        .then((res) => {
          if (res.status) {
            closeDialog(this);
            this.posts.push(res.result as never);
          }
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e.message).title);
        });
    },
  },
});
</script>