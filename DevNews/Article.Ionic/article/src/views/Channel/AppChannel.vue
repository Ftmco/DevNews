<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-item>
          <ion-title>{{ channelName }}</ion-title>
          <ion-avatar>
            <ion-img :src="channel.avatar"></ion-img>
          </ion-avatar>
        </ion-item>
        <ion-buttons slot="start">
          <ion-button
            @click="
              () => {
                this.$router.back();
              }
            "
          >
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-segment
          scrollable
          :value="page"
          swipe-gesture
          @ionChange="changeTab"
        >
          <ion-segment-button value="posts">
            <ion-label>Posts</ion-label>
          </ion-segment-button>
          <ion-segment-button value="articles">
            <ion-label>Articles</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>

      <ChannelPosts v-if="page == 'posts'" :channToken="token" />
      <ChannelArticles v-if="page == 'articles'" />
    </ion-content>

    <ion-fab
      v-if="isAdmin == true"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <ion-fab-button @click="addItem" color="info">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-fab
      v-if="isIn == false"
      vertical="bottom"
      horizontal="start"
      slot="fixed"
    >
      <ion-fab-button color="info">
        <ion-icon :icon="logIn"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  modalController,
  IonImg,
  IonAvatar,
  IonItem,
  IonIcon,
  IonButton,
  IonFabButton,
  IonFab,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";

import { arrowBack, add, logIn } from "ionicons/icons";
import ChannelService from "@/api/service/channel.service";
import { apiCall } from "@/api";
import { showToast } from "@/services/components/Toast";
import { createFileAddress } from "@/services/file";
import CreateItems from "@/components/channel/CreateItems.vue";
import SendFile from "@/components/channel/SendFile.vue";
import CreateArticle from "@/components/article/CreateArticle.vue";
import { newspaper, chatboxSharp } from "ionicons/icons";
import ChannelPosts from "@/components/channel/ChannelPosts.vue";
import ChannelArticles from "@/components/channel/ChannelArticles.vue";

export default defineComponent({
  components: {
    ChannelPosts,
    ChannelArticles,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonImg,
    IonAvatar,
    IonItem,
    IonIcon,
    IonButton,
    IonFabButton,
    IonFab,
    IonLabel,
    IonSegment,
    IonSegmentButton,
  },
  data: () => ({
    channelName: "",
    token: "",
    channel: {},
    isAdmin: false,
    isIn: false,
    arrowBack,
    add,
    logIn,
    channelServices: new ChannelService(apiCall),
    posts: [],
    isDisabled: false,
    newspaper,
    chatboxSharp,
    page: "posts",
  }),
  created() {
    this.channelName = this.$route.query.name?.toString() as string;
    this.token = this.$route.query.token?.toString() as string;
    this.getChannel();
  },
  methods: {
    getChannel() {
      this.channelServices.getChannel(this.token).then((res) => {
        if (res.status) {
          this.channel = {
            ...res.result.channel,
            avatar: createFileAddress(res.result.channel.avatar[0]),
          };
          this.isAdmin = res.result.isAdmin;
          this.isIn = res.result.isIn;
        }
        showToast(res.title);
      });
    },
    changeTab(e: any) {
      const value = e.detail.value;
      this.page = value;
    },
    async addItem() {
      const sheetModal = await modalController.create({
        breakpoints: [0.1, 0.3, 0.5],
        backdropDismiss: true,
        swipeToClose: true,
        initialBreakpoint: 0.5,
        component: CreateItems,
        mode: "ios",
      });
      sheetModal.present();

      sheetModal.onDidDismiss().then(async (e: any) => {
        await this.sendItem(e);
      });
    },
    async sendItem(e: any) {
      const data = e.data;
      if (data != null) {
        let component: any = SendFile;
        let props = {};
        switch (data.type) {
          case "file": {
            component = SendFile;
            props = {
              mime: "/*",
              mimeName: "File",
              channelToken: this.token,
            };
            break;
          }
          case "image": {
            component = SendFile;
            props = {
              mime: "image/*",
              mimeName: "Image",
              channelToken: this.token,
            };
            break;
          }
          case "video": {
            component = SendFile;
            props = {
              mime: "video/*",
              mimeName: "Video",
              channelToken: this.token,
            };
            break;
          }
          case "article": {
            component = CreateArticle;
            props = {
              mime: "Article",
            };
            break;
          }
          case "post": {
            component = SendFile;
            props = {
              mime: "post",
              mimeName: "Post",
              channelToken: this.token,
            };
            break;
          }
        }
        const sendItemModal = await modalController.create({
          breakpoints: [0.1, 0.5, 1],
          initialBreakpoint: 0.8,
          backdropDismiss: true,
          swipeToClose: true,
          component: component,
          componentProps: props,
        });
        sendItemModal.present();
        sendItemModal.onDidDismiss().then((res) => {
          this.postSent(res);
        });
      }
    },
    postSent(e: any) {
      const data = e.data;
      if (data.status) {
        this.posts.push(data.result as never);
      }
    },
    loadData(e: any) {
      console.log(e);
      setTimeout(() => {
        e.target.complete();
        this.isDisabled = true;
      }, 1000);
    },
  },
});
</script>
