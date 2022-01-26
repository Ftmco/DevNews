<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Channels</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="channel in channels" :key="channel.id">
          <ion-avatar slot="start">
            <img :src="createFileAddress(channel.avatar[0])" />
          </ion-avatar>
          <ion-label>
            <h2>{{ channel.name }}</h2>
            <h3>I'm a big deal</h3>
            <p>Listen, I've had a pretty messed up day...</p>
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
  onIonViewWillEnter,
} from "@ionic/vue";
import ChannelServices from "@/api/service/channel.service";
import { apiCall } from "@/api/index";
import { computed } from "@vue/runtime-core";
import { createFileAddress } from "@/services/file";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  setup(props: any, { emit }: any) {
    const _channel = new ChannelServices(apiCall);
    let channels = computed({
      get: () => [],
      set: (value) => emit("update:channels", value),
    });

    const loadChannels = async () => {
      const result = await _channel.getChannels();
      if (result.status) {
        channels = result.result;
      }
    };

    onIonViewWillEnter(() => {
      loadChannels();
      console.log(channels);
    });

    return {
      loadChannels,
      channels,
      createFileAddress,
    };
  },
};
</script>