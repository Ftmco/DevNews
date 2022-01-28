<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <iont-toolbar>
        <ion-searchbar
          animated
          show-cancel-button="focus"
          show-clear-button="focus"
          @ionInput="input"
        ></ion-searchbar>
      </iont-toolbar>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
} from "@ionic/vue";
// import SearchServices from "@/api/service/search.service";
// import { apiCall } from "@/api/index";
export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSearchbar,
  },
 
};
</script>