<template>
  <ion-card>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-card-header>
      <ion-row>
        <ion-avatar>
          <ion-img :src="profile.avatar"></ion-img>
        </ion-avatar>
        <ion-fab horizontal="end">
          <ion-fab-button>
            <ion-icon :icon="settings"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="start">
            <ion-fab-button color="warning">
              <ion-icon :icon="pencil"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="danger" @click="logout">
              <ion-icon :icon="exit"></ion-icon>
            </ion-fab-button>
            <ion-fab-button>
              <ion-icon :icon="pencil"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>
      </ion-row>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="floating">Full Name</ion-label>
        <ion-input
          readonly
          :value="profile.FullName"
          placeholder="Full Name"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">User Name</ion-label>
        <ion-input
          readonly
          :value="profile.UserName"
          placeholder="User Name"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">MobileNo</ion-label>
        <ion-input
          readonly
          readonly:value="profile.Mobileno"
          placeholder="Mobileno"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">E-mail</ion-label>
        <ion-input
          readonly
          :value="profile.Email"
          placeholder="E-mail"
        ></ion-input>
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ProfileService from "@/api/service/profile.service";
import { showToast } from "@/services/components/Toast";
import { defineComponent } from "vue";
import { createFileAddress } from "@/services/file";
import { pencil, exit, settings } from "ionicons/icons";
import AccountServiec from "@/api/service/account.service";

import {
  IonFab,
  IonItem,
  IonInput,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonFabButton,
  IonFabList,
  IonImg,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonFab,
    IonItem,
    IonInput,
    IonLabel,
    IonAvatar,
    IonIcon,
    IonFabButton,
    IonFabList,
    IonImg,
    IonRow,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonHeader,
    IonToolbar,
    IonTitle,
  },
  data: () => ({
    profile: {},
    profleServices: new ProfileService(apiCall),
    accountServices: new AccountServiec(apiCall),
    pencil,
    exit,
    settings,
  }),
  beforeMount() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.profleServices
        .getProfile()
        .then((res) => {
          console.log(res);

          if (res.Status) {
            this.profile = {
              ...res.Result,
              avatar: createFileAddress(res.Result.Image[0]),
            };
          }
          showToast(res.Title);
        })
        .catch((e) => {
          showToast(e.message);
        });
    },
    logout() {
      this.accountServices.LogOut().then(() => {
        window.location.reload();
      });
    },
  },
});
</script>
