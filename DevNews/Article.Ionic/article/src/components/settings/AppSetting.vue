<template>
  <ion-card>
    <ion-header>
      <ion-toolbar>
        <ion-title>Application Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-card-content>
      <ion-item>
        <ion-label>Language</ion-label>
        <ion-select :selected-text="lang" @ionChange="setLang">
          <ion-select-option value="fa">Fa</ion-select-option>
          <ion-select-option value="en">En</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCardContent,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCardContent,
    IonItem,
    IonSelect,
    IonSelectOption,
  },
  data: () => ({
    lang: "",
  }),
  created() {
    this.setSettings();
  },
  methods: {
    setSettings() {
      this.lang = localStorage.getItem("lang") ?? "";
    },
    setLang(e: any) {
      const value = e.detail.value;
      localStorage.setItem("lang", value);
      this.lang = value;
    },
  },
});
</script>
