<template>
  <v-list-item :to="`/channel?id=${channel.id}`">
    <v-col>
      <v-list-item-avatar size="50" color="grey">
        <v-img :src="channel.image" :lazy-src="channel.image" />
      </v-list-item-avatar>
    </v-col>
    <v-list-item-content>
      <v-list-item-title v-html="channel.text"></v-list-item-title>
      <v-list-item-subtitle v-html="channel.text"></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    channel: Object,
  },
});
</script>