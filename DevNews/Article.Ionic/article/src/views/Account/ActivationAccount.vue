<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Activation</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-card>
        <ion-card-header>
          <ion-card-title> Account Activation </ion-card-title>
          <br />
          <img src="../../assets/images/not-authorized.png" alt="" />
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">User Name</ion-label>
            <ion-input
              v-model="user.userName"
              required
              clear-input
              placeholder="User Name"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Active Code</ion-label>
            <ion-input
              v-model="user.activeCode"
              required
              clear-input
              placeholder="Active Code"
            ></ion-input>
          </ion-item>
          <ion-button expand="block" @click="active">Active Account</ion-button>
          <ion-button
            expand="block"
            fill="outline"
            @click="
              () => {
                this.$router.push({ name: 'login' });
              }
            "
            >Login</ion-button
          >
          <ion-button expand="block" fill="outline">Forgot Password</ion-button>
          <ion-button expand="block" fill="outline"
            >Activation Account</ion-button
          >
        </ion-card-content>
      </ion-card>
    </ion-content>
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonCardTitle,
  IonInput,
} from "@ionic/vue";
import AccountServiec from "@/api/service/account.service";
import { apiCall } from "@/api";
import { SignUp } from "@/api/models/account.model";
import { showToast } from "@/services/components/Toast";
import router from "@/router";
import { closeLoading, openLoading } from "@/services/components/Core";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonCardTitle,
    IonInput,
  },
  data: () => ({
    user: {
      userName: "",
      activeCode: "",
    },
    accountServices: new AccountServiec(apiCall),
  }),
  methods: {
    async active() {
      const loading = await openLoading();
      this.accountServices
        .Acivation(this.user)
        .then((res) => {
          if (res.status) {
            router.push({
              name: "login",
            });
          }
          showToast(res.title);
        })
        .finally(() => {
          closeLoading(loading);
        });
    },
  },
});
</script>
