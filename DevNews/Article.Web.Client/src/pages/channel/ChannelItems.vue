<template>
  <div>
    <channel-bar :channel="channel" @avatarClick="avatarClick" />
    <v-col cols="12">
      <v-tabs fixed-tabs>
        <v-tab>Posts</v-tab>
        <v-tab>Articles</v-tab>
        <v-tab-item>
          <channel-posts :channelToken="token" />
        </v-tab-item>
        <v-tab-item>
          <channel-articles :channelToken="token" />
        </v-tab-item>
      </v-tabs>
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
import ChannnelInfo from "@/components/channel/ChannelInfo.vue";
import ChannelPosts from "@/components/channel/ChannelPosts.vue";
import ChannelArticles from "@/components/channel/ChannelArticles.vue";

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
    ChannelPosts,
    ChannelArticles,
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
    eventSheet(env: any) {
      switch (env.item.type) {
        case 0:
          this.openDialogApp("primary", "Send File", SendFile, {
            type: env.item.type,
          });
          break;
        case 1:
          this.openDialogApp("primary", "Send Image", SendFile, {
            type: env.item.type,
          });
          break;
        case 4:
          this.openDialogApp("info", "Create Article", UpsertArticle, {
            type: env.item.type,
          });
          break;
        default:
          break;
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
    avatarClick() {
      this.openDialogApp("info", "Channel Info", ChannnelInfo, {
        channel: this.channel,
        owner: this.owner,
      });
    },
  },
});
</script>