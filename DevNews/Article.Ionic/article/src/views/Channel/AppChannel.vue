<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ channelName }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true"> </ion-content>
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
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
  data: () => ({
    channelName: "",
    token: "",
  }),
  created() {
    this.channelName = this.$route.query.name?.toString() as string;
    this.token = this.$route.query.token?.toString() as string;
  },
});
</script>
