<template>
  <v-list rounded>
    <v-list-item-group color="primary">
      <v-list-item v-for="(article, i) in articles" :key="i">
        <v-list-item-avatar>
          <v-img :src="article.image" :lazy-src="channel.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="article.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    articles: [],
  },
});
</script>