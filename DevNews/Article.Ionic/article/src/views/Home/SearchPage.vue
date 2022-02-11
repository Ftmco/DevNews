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

      <ion-list v-if="searchResult.Channels.length > 0">
        <ion-list-header>Channels</ion-list-header>
        <ion-item
          v-for="channel in searchResult.Channels"
          :key="channel.Id"
          @click="
            () => {
              $router.push({
                name: 'channel',
                query: {
                  token: channel.Token,
                  name: channel.Name,
                },
              });
            }
          "
        >
          <ion-avatar slot="start">
            <img :src="createFileAddress(channel.Avatar[0])" />
          </ion-avatar>
          <ion-label>
            <h2>{{ channel.Name }}</h2>
            <p>{{ channel.Name }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list v-if="searchResult.Categories.length > 0">
        <ion-list-header>Categories</ion-list-header>
        <ion-item
          v-for="category in searchResult.Categories"
          :key="category.Id"
        >
          <ion-label>
            <h2>{{ category.Name }}</h2>
            <p>{{ category.Title }}</p>
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
      Categories: [],
      Channels: [],
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
          if (res.Status) {
            this.searchResult = res.Result;
          }
          showToast(res.Title);
        });
      } else
        this.searchResult = {
          Categories: [],
          Channels: [],
        };
    },
  },
});
</script>