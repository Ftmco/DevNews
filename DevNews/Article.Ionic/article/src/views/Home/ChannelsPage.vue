<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Channels</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="reloadChannels">
        <ion-refresher-content
          pulling-text="Pull to refresh"
          refreshing-spinner="circles"
          refreshing-text="Reloading..."
        >
        </ion-refresher-content>
      </ion-refresher>
      <ion-list v-if="channels.length > 0">
        <ion-item
          @click="toChannel(channel)"
          v-for="channel in channels"
          :key="channel.id"
        >
          <ion-avatar slot="start">
            <img :src="channel.image" />
          </ion-avatar>
          <ion-label>
            <h2>{{ channel.Name }}</h2>
            <p>{{ channel.Name }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-fab
        vertical="bottom"
        horizontal="end"
        @click="newChannel"
        slot="fixed"
      >
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  loadingController,
  modalController,
  IonFab,
  IonFabButton,
  IonAvatar,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { add } from "ionicons/icons";

import ChannelServices from "@/api/service/channel.service";
import { apiCall } from "@/api/index";
import { createFileAddress } from "@/services/file";
import { defineComponent } from "vue";
import { showToast } from "@/services/components/Toast";
import { messages } from "@/constants";
import router from "@/router";
import CreateChannel from "@/components/channel/CreateChannel.vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonAvatar,
    IonLabel,
    IonItem,
    IonList,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
  },
  data: () => ({
    loading: loadingController.create({
      message: "Plase Wait...",
      spinner:'bubbles'
    }),
    channels: [{}],
    channelService: new ChannelServices(apiCall),
    add,
  }),
  created() {
    this.getChannels();
  },
  methods: {
    getChannels() {
      this.openLoading();
      this.channelService
        .getChannels()
        .then((res) => {

          console.log(res);
          
          this.channels = [];
          if (res.Status) {
            res.Result.forEach((channel: any) => {
              const item = {
                ...channel,
                image: createFileAddress(channel.Avatar[0]),
              };
              this.channels.push(item);
            });
          } else {
            showToast(res.Title);
          }
          this.closeLoadin();
        })
        .catch((e) => {
          showToast(messages.netWorkError(e.message).Message);
          this.closeLoadin();
        });
    },
    reloadChannels(e: any) {
      this.getChannels();
      setTimeout(() => {
        e.target.complete();
      }, 250);
    },
    toChannel(channel: any) {
      router.push({
        name: "channel",
        query: {
          token: channel.token,
          name: channel.name,
        },
      });
    },
    async newChannel() {
      const sheetModal = await modalController.create({
        swipeToClose: true,
        breakpoints: [0.1, 0.5, 1],
        initialBreakpoint: 0.9,
        component: CreateChannel,
        backdropDismiss: true,
        mode:'ios'
      });
      sheetModal.present();

      const modalResponse = await sheetModal.onDidDismiss();
      const result = modalResponse.data;
      if (result.status) {
        this.getChannels();
      }
      showToast(result.title);
    },
    async openLoading() {
      const loading = await this.loading;
      loading.present();
    },
    async closeLoadin() {
      const loading = await this.loading;
      loading.dismiss();
    },
  },
});
</script>
