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
      <post-item v-for="post in posts" :key="post.id" :post="post" />
      <ion-infinite-scroll
        @ionInfinite="loadData"
        threshold="100px"
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more posts..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
    <ion-fab
      v-if="isAdmin == true"
      vertical="bottom"
      horizontal="center"
      slot="fixed"
    >
      <ion-fab-button @click="addItem">
        <ion-icon :icon="add"></ion-icon>
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonFabButton,
  IonFab,
} from "@ionic/vue";

import { arrowBack, add } from "ionicons/icons";
import ChannelService from "@/api/service/channel.service";
import { apiCall } from "@/api";
import { showToast } from "@/services/components/Toast";
import { createFileAddress } from "@/services/file";
import CreateItems from "@/components/channel/CreateItems.vue";
import SendFile from "@/components/channel/SendFile.vue";
import PostItem from "@/components/channel/PostItem.vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    PostItem,
    IonImg,
    IonAvatar,
    IonItem,
    IonIcon,
    IonButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFabButton,
    IonFab,
  },
  data: () => ({
    channelName: "",
    token: "",
    channel: {},
    isAdmin: false,
    arrowBack,
    add,
    channelServices: new ChannelService(apiCall),
    posts: [],
    isDisabled: false,
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
          this.getPosts(this.token);
        }
        showToast(res.title);
      });
    },
    getPosts(token: string) {
      this.channelServices.getChannelPosts(token).then((res) => {
        if (res.status) {
          this.posts = res.result;
        }
        showToast(res.title);
      });
    },
    async addItem() {
      const sheetModal = await modalController.create({
        breakpoints: [0.1, 0.5],
        backdropDismiss: true,
        swipeToClose: true,
        initialBreakpoint: 0.3,
        component: CreateItems,
      });
      sheetModal.present();

      sheetModal.onDidDismiss().then(async (e: any) => {
        await this.sendItem(e);
      });
    },
    async sendItem(e: any) {
      const data = e.data;
      let component = SendFile;
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
          component = SendFile;
          props = {
            mime: "Image",
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
