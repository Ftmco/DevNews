<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Send File : {{ mimeName }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content fullscreen>
    <ion-card>
      <input type="file" :accept="mime" hidden id="fileInput" />
      <img v-if="mimeName == 'Image'" :src="fileData.base64" alt="" />

      <ion-item>
        <ion-label position="floating">Message</ion-label>
        <ion-textarea placeholder="Message" auto-grow></ion-textarea>
      </ion-item>
      <ion-button v-if="mimeName != 'Post'" fill="clear" @click="choseFile"
        >Select {{ mimeName }}</ion-button
      >

      <ion-button expand="block" @click="send"> Send </ion-button>
    </ion-card>
  </ion-content>
</template>

<script lang="ts">
import { FileModel } from "@/api/models/article.model";
import { convertToBase64File, fileModel } from "@/services/file";
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonItem,
  IonLabel,
  IonTextarea,
  modalController,
} from "@ionic/vue";
import ChannelService from "@/api/service/channel.service";
import { apiCall } from "@/api";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonItem,
    IonLabel,
    IonTextarea,
  },
  props: {
    mime: String,
    channelToken: String,
    mimeName: String,
  },
  data: () => ({
    fileData: {
      base64: "",
      type: "",
      ogName: "",
    },
    message: "",
    channelServices: new ChannelService(apiCall),
  }),
  methods: {
    choseFile() {
      const input = document.getElementById("fileInput");
      if (input != null) {
        input.click();
        input.onchange = (e) => {
          const target = e.target as any;
          const file = target.files[0];
          convertToBase64File(file).then((res) => {
            this.fileData = res as FileModel;
          });
        };
      }
    },
    send() {
      this.channelServices
        .sendMessage({
          message: this.message,
          token: this.channelToken,
          file: this.fileData,
        })
        .then(async (res) => {
          await modalController.dismiss(res);
        });
    },
  },
});
</script>
