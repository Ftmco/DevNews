<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-card>
        <ion-card-header>
          <ion-card-title> Register Account </ion-card-title>
          <br />
          <img src="../../assets/images/register.png" alt="" />
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
            <ion-label position="floating">Full Name</ion-label>
            <ion-input
              v-model="user.fullName"
              required
              clear-input
              placeholder="Full Name"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">E-main</ion-label>
            <ion-input
              type="email"
              v-model="user.email"
              required
              clear-input
              placeholder="E-main"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Mobile No</ion-label>
            <ion-input
              type="tel"
              v-model="user.phoneNumber"
              required
              clear-input
              placeholder="Mobile No"
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

          <ion-button expand="block" @click="register">Register</ion-button>
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
      password: "",
      email: "",
      phoneNumber: "",
      fullName: "",
    },
    accountServices: new AccountServiec(apiCall),
  }),
  methods: {
    async register() {
      const loading = openLoading();
      this.accountServices
        .SignUp(this.user)
        .then((res) => {
          if (res.status) {
            router.push({
              name: "activation",
            });
          }
          showToast(res.title);
        })
        .finally(() => {
          loading.then((res) => res.dismiss());
        });
    },
  },
});
</script>
