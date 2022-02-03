<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet mode="ios"></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Home" href="/tabs/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Channels" href="/tabs/channels">
          <ion-icon :icon="chatbubbles"></ion-icon>
          <ion-label>Channels</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Search" href="/tabs/search">
          <ion-icon :icon="search"></ion-icon>
          <ion-label>Search</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/settings">
          <ion-icon :icon="cog"></ion-icon>
          <ion-label>Setting</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  home,
  chatbubbles,
  search,
  cog,
} from "ionicons/icons";

export default {
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      ellipse,
      square,
      triangle,
      home,
      chatbubbles,
      search,
      cog,
    };
  },
};
</script>