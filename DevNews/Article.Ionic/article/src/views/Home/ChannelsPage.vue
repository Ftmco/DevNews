<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Channels</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
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
            <h2>{{ channel.name }}</h2>
            <p>{{ channel.name }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
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
} from "@ionic/vue";
import ChannelServices from "@/api/service/channel.service";
import { apiCall } from "@/api/index";
import { createFileAddress } from "@/services/file";
import { defineComponent } from "vue";
import { showToast } from "@/services/components/Toast";
import { messages } from "@/constants";
import router from "@/router";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
  data: () => ({
    loading: loadingController.create({
      message: "Plase Wait...",
    }),
    channels: [{}],
    channelService: new ChannelServices(apiCall),
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
          this.channels = [];
          if (res.status) {
            res.result.forEach((channel: any) => {
              const item = {
                ...channel,
                image: createFileAddress(channel.avatar[0]),
              };
              this.channels.push(item);
            });
          } else {
            showToast(res.title);
          }
          this.closeLoadin();
        })
        .catch((e) => {
          showToast(messages.netWorkError(e.message).message);
          this.closeLoadin();
        });
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