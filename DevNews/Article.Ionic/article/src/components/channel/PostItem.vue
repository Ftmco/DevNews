<template>
  <ion-card>
    <ion-card-content>
      <ion-img
        v-if="mainFile.type.indexOf('image') != -1"
        :src="createFileAddress(mainFile)"
      ></ion-img>
      <ion-card v-if="mainFile.name != ''">
        <ion-item v-for="file in post.files" :key="file.id">
          <ion-chip v-if="file.name != ''">
            {{ file.orginalName }} - {{ file.size / 1000 / 1000 }} MB

            <ion-icon :icon="download"></ion-icon>
          </ion-chip>
        </ion-item>
      </ion-card>
      <br />
      <ion-card-subtitle> {{ post.message }}</ion-card-subtitle>
      <br />
      <ion-item>
        <ion-fab-button size="small" color="danger">
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button size="small" color="primary">
          <ion-icon :icon="chatboxOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button size="small" color="info">
          <ion-icon :icon="bookmarkOutline"></ion-icon>
        </ion-fab-button>
      </ion-item>
      <br />
      <ion-card-subtitle>{{ post.createDate }}</ion-card-subtitle>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonCardContent,
  IonImg,
  IonCardSubtitle,
  IonItem,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";

import {
  heartOutline,
  chatboxOutline,
  bookmarkOutline,
  download,
} from "ionicons/icons";
import { createFileAddress } from "@/services/file";

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonImg,
    IonCardSubtitle,
    IonItem,
    IonFabButton,
    IonIcon,
  },
  props: {
    post: Object,
  },
  data: () => ({
    heartOutline,
    chatboxOutline,
    bookmarkOutline,
    download,
    mainFile: {},
  }),
  created() {
    this.setMainFile();
  },
  methods: {
    setMainFile() {
      const files = (this.post as any).files;
      this.mainFile = files[0];
    },
    createFileAddress,
  },
});
</script>
