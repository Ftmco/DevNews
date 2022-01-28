<template>
  <ion-list-header>Profile</ion-list-header>
  <ion-card>
    <ion-card-header>
      <ion-row>
        <ion-avatar>
          <ion-img :src="profile.avatar"></ion-img>
        </ion-avatar>
        <ion-fab horizontal="end">
          <ion-fab-button>
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="start">
            <ion-fab-button color="warning">
              <ion-icon :icon="pencil"></ion-icon>
            </ion-fab-button>
            <ion-fab-button>
              <ion-icon :icon="pencil"></ion-icon>
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
          :value="profile.fullName"
          placeholder="Full Name"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">User Name</ion-label>
        <ion-input
          readonly
          :value="profile.userName"
          placeholder="User Name"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">MobileNo</ion-label>
        <ion-input
          readonly
          readonly:value="profile.mobileno"
          placeholder="Mobileno"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">E-mail</ion-label>
        <ion-input
          readonly
          :value="profile.email"
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
import { pencil, arrowBack } from "ionicons/icons";
import { modalController } from "@ionic/vue";
import ProfileImages from "@/components/account/ProfileImages.vue";

export default defineComponent({
  data: () => ({
    profile: {},
    profleServices: new ProfileService(apiCall),
    pencil,
    arrowBack,
  }),
  beforeMount() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.profleServices
        .getProfile()
        .then((res) => {
          if (res.status) {
            this.profile = {
              ...res.result,
              avatar: createFileAddress(res.result.image[0]),
            };
            console.log(this.profile);
          }
          showToast(res.title);
        })
        .catch((e) => {
          showToast(e.message);
        });
    },
  },
});
</script>
