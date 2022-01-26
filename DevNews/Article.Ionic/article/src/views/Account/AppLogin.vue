<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
      <ion-content :fullscreen="true">
        <ion-input placeholder="User Name"></ion-input>
      </ion-content>
    </ion-header>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonInput
}from "@ionic/vue"


export default defineComponent({
    components:{
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonInput
    }
});
</script>
