<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title> Welcome to your account. </ion-card-title>
          <br />
          <img src="../../assets/images/login.png" alt="" />
        </ion-card-header>
        <ion-card-content>
          <ion-item >
            <ion-label position="floating">User Name</ion-label>
            <ion-input
              v-model="user.userName"
              required
              clear-input
              placeholder="User Name"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input
              v-model="user.password"
              type="password"
              required
              clear-input
              pattern="password"
              placeholder="Password"
            ></ion-input>
          </ion-item>

          <ion-button expand="block" @click="login">Login</ion-button>
          <ion-button
            expand="block"
            fill="outline"
            @click="
              () => {
                this.$router.push({ name: 'register' });
              }
            "
            >Register</ion-button
          >
          <ion-button expand="block" fill="outline">Forgot Password</ion-button>
          <ion-button
            expand="block"
            fill="outline"
            @click="
              () => {
                this.$router.push({ name: 'activation' });
              }
            "
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
  IonTitle,
  IonContent,
  IonInput,
  IonToolbar,
  IonCard,
  IonLabel,
  IonItem,
  IonButton,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/vue";
import AccountServiec from "@/api/service/account.service";
import { apiCall } from "@/api";
import { showToast } from "@/services/components/Toast";
import { messages } from "@/constants";
import { openLoading } from "@/services/components/Core";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonInput,
    IonToolbar,
    IonCard,
    IonLabel,
    IonItem,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
  },
  data: () => ({
    user: {
      userName: "",
      password: "",
    },
    accountServices: new AccountServiec(apiCall),
  }),
  methods: {
    async login() {
      if (this.user.userName.trim() != "" && this.user.password.trim() != "") {
        openLoading();
        this.accountServices
          .Login(this.user)
          .then((res) => {
            if (res.status) {
              window.location.reload();
            }
            showToast(res.title);
          })
          .catch((e) => {
            showToast(messages.netWorkError(e.message).message);
          });
      } else showToast(messages.invalidForm);
    },
  },
});
</script>
