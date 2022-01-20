<template>
  <v-col cols="12">
    <v-text-field
      outlined
      v-model="search"
      placeholder="Search"
      label="Search"
      append-icon="mdi-magnify"
      @click:append="goSearch"
    />
    <v-card class="mx-auto" tile v-if="searchResult.channels.length > 0">
      <v-card-title>Channels</v-card-title>
      <channel-list :channels="searchResult.channels" />
    </v-card>
    <v-divider></v-divider>
    <v-card class="mx-auto" tile v-if="searchResult.groups.length > 0">
      <v-card-title>Groups</v-card-title>
      <group-list :groups="searchResult.groups" />
    </v-card>
    <v-divider></v-divider>
    <v-card class="mx-auto" tile v-if="searchResult.articles.length > 0">
      <v-card-title>Articles</v-card-title>
      <article-list :articles="searchResult.articles" />
    </v-card>
  </v-col>
</template>



<script lang="ts">
import { apiCall } from "@/api";
import SearchService from "@/api/service/search.service";
import { messages } from "@/constants";
import { showMessage } from "@/services/message";
import ChannelList from "@/components/channel/ChannelList.vue";
import Vue from "vue";
import GroupList from "@/components/article/GroupList.vue";
import ArticleList from "@/components/article/ArticleList.vue";
export default Vue.extend({
  components: {
    ChannelList,
    GroupList,
    ArticleList,
  },
  data: () => ({
    search: "",
    searchService: new SearchService(apiCall),
    searchResult: {
      channels: [],
      groups: [],
      articles: [],
    },
  }),
  methods: {
    goSearch() {
      if (this.search.trim() != "") {
        (this.$root.$refs.loading as any).open();
        this.searchService
          .search(this.search)
          .then((res) => {
            if (res.status) {
              this.searchResult = res.result;
            }
            showMessage(this, res.title);
          })
          .catch((e) => {
            showMessage(this, messages.netWorkError(e.message).title);
          });
      }
    },
  },
});
</script>