<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-item>
          <ion-searchbar
            animated
            show-cancel-button="focus"
            show-clear-button="focus"
            v-model="searchValue"
            @ionInput="submit"
          ></ion-searchbar>
        </ion-item>
      </ion-toolbar>

      <ion-list v-if="searchResult.channels.length > 0">
        <ion-list-header>Channels</ion-list-header>
        <ion-item v-for="channel in searchResult.channels" :key="channel.id">
          <ion-avatar slot="start">
            <img :src="createFileAddress(channel.avatar[0])" />
          </ion-avatar>
          <ion-label>
            <h2>{{ channel.name }}</h2>
            <p>{{ channel.name }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list v-if="searchResult.categories.length > 0">
        <ion-list-header>Categories</ion-list-header>
        <ion-item
          v-for="category in searchResult.categories"
          :key="category.id"
        >
          <ion-label>
            <h2>{{ category.name }}</h2>
            <p>{{ category.title }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
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
  IonItem,
  IonList,
  IonLabel,
  IonListHeader,
  IonAvatar,
} from "@ionic/vue";
import SearchService from "@/api/service/search.service";
import { apiCall } from "@/api";
import { showToast } from "@/services/components/Toast";
import { createFileAddress } from "@/services/file";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSearchbar,
    IonItem,
    IonList,
    IonLabel,
    IonListHeader,
    IonAvatar,
  },
  data: () => ({
    searchValue: "",
    searchResult: {
      categories: [],
      channels: [],
    },
    searchServices: new SearchService(apiCall),
    createFileAddress,
  }),
  methods: {
    async submit(e: any) {
      const target = e.target;
      const value = target.value;
      if (value.trim() != "") {
        this.searchServices.search(value).then((res: any) => {
          if (res.status) {
            this.searchResult = res.result;
          }
          showToast(res.title);
        });
      } else
        this.searchResult = {
          categories: [],
          channels: [],
        };
    },
  },
});
</script>