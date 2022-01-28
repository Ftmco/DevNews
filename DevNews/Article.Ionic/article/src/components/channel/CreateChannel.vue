<template>
  <ion-header>
    <ion-toolbar>
      <ion-title> Create Channel </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-card>
      <img src="../../assets/images/CreateChannel.png" alt="" />
      <ion-card-content>
        <ion-avatar @click="selectAvatar">
          <img
            v-if="channel.avatar.base64 == ''"
            src="../../assets/images/selectimage.png"
            alt=""
          />
          <img v-else :src="channel.avatar.base64" alt="" />
        </ion-avatar>
        <ion-item>
          <ion-label position="floating"> Channel Name </ion-label>
          <ion-input
            v-model="channel.name"
            required
            clear-input
            placeholder="Channel Name"
            type="text"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating"> Channel Link </ion-label>
          <ion-input
            v-model="channel.link"
            required
            clear-input
            placeholder="Channel Link"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Categories</ion-label>
          <ion-select
            v-model="channel.categories"
            required
            clear-input
            multiple="true"
            cancel-text="Cancel"
            ok-text="Ok"
          >
            <ion-select-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</ion-select-option
            >
          </ion-select>
        </ion-item>

        <ion-button expand="block" @click="createChannel">Create</ion-button>
      </ion-card-content>
    </ion-card>
    <input type="file" hidden id="avatarFile" />
  </ion-content>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import CategoryService from "@/api/service/category.service";
import { defineComponent } from "vue";
import { convertToBase64File, fileModel } from "@/services/file";
import { FileModel } from "@/api/models/article.model";
import ChannelService from "@/api/service/channel.service";
import {
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonSelect,
  IonLabel,
  IonAvatar,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonSelectOption,
  modalController,
} from "@ionic/vue";
import { Channel } from "@/api/models/channel.model";
import { showToast } from "@/services/components/Toast";

export default defineComponent({
  components: {
    IonContent,
    IonInput,
    IonButton,
    IonCard,
    IonCardContent,
    IonItem,
    IonSelect,
    IonLabel,
    IonAvatar,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonSelectOption,
  },
  data: () => ({
    categoryServices: new CategoryService(apiCall),
    channelServices: new ChannelService(apiCall),
    categories: [],
    channel: {
      name: "",
      link: "",
      categories: [],
      avatar: {
        base64: "",
        type: "",
        ogName: "",
      },
    },
  }),
  beforeMount() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.categoryServices.getCategories().then((res) => {
        this.categories = res.result;
      });
    },
    createChannel() {
      this.channelServices
        .createChannel(this.channel as Channel)
        .then(async (res) => {
          await modalController.dismiss(res);
        })
        .catch((e) => {
          showToast(e.message);
        });
    },
    selectAvatar() {
      const select = document.getElementById("avatarFile");
      if (select != null) {
        select.click();
        select.onchange = (e) => {
          const target = e.target as any;
          const file = target.files;
          convertToBase64File(file[0]).then((res) => {
            this.channel.avatar = res as FileModel;
          });
        };
      }
    },
  },
});
</script>
