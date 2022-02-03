<template>
  <ion-card>
    <ion-header>
      <ion-toolbar>
        <ion-title>Create New Article</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-card-content mode="ios">
      <ion-item>
        <ion-button
          size="default"
          expand="block"
          fill="outline"
          color="primary"
          @click="selectmainFile"
        >
          Select Main Image
        </ion-button>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Title</ion-label>
        <ion-input placeholder="Title" clear-input></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Short Description</ion-label>
        <ion-textarea placeholder="Short Decruption" auto-grow></ion-textarea>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Text</ion-label>
        <ion-textarea placeholder="Text" auto-grow></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>Categories</ion-label>
        <ion-select
          v-model="article.categories"
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
      <ion-item>
        <ion-button
          size="default"
          expand="block"
          fill="outline"
          color="primary"
          @click="selectAttachmentFiles"
        >
          Select Attachemnt Files
        </ion-button>
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
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import CategoryService from "@/api/service/category.service";
import { apiCall } from "@/api";


export default defineComponent({
  components: {
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
  },
  data: () => ({
    article: {
      text: "Write text...",
      categories: [],
    },
    categories: [],
    categoryServices: new CategoryService(apiCall),
  }),
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.categoryServices.getCategories().then((res) => {
        if (res.status) {
          this.categories = res.result;
        }
      });
    },
  },
});
</script>
