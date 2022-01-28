<template>
  <ion-header>
    <ion-toolbar>
      <ion-title> Channel Items </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-card>
      <ion-button expand="block" fill="clear" @click="emit('file')">
        File
        <ion-icon :icon="fileTray"></ion-icon>
      </ion-button>
      <ion-button expand="block" fill="clear" @click="emit('post')">
        Post
        <ion-icon :icon="paperPlane"></ion-icon>
      </ion-button>
      <ion-button expand="block" fill="clear" @click="emit('article')">
        Article
        <ion-icon :icon="newspaper"></ion-icon>
      </ion-button>
      <ion-button expand="block" fill="clear" @click="emit('video')">
        Video
        <ion-icon :icon="videocam"></ion-icon>
      </ion-button>
      <ion-button expand="block" fill="clear" @click="emit('image')">
        Image
        <ion-icon :icon="image"></ion-icon>
      </ion-button>
    </ion-card>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  //IonItem,
  IonButton,
  IonIcon,
  modalController,
} from "@ionic/vue";

import {
  fileTray,
  paperPlane,
  videocam,
  image,
  newspaper,
} from "ionicons/icons";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    //IonItem,
    IonButton,
    IonIcon,
  },
  setup() {
    const emit = async (type: string) => {
      await modalController.dismiss({ type });
    };
    return {
      emit,
      fileTray,
      paperPlane,
      videocam,
      image,
      newspaper,
    };
  },
});
</script>
