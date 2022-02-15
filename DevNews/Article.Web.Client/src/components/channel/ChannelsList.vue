<template>
  <v-list>
    <v-list-item
      v-for="item in channels"
      :to="{
        name: 'Channel',
        query: { token: item.token, name: item.name },
      }"
      :key="item.token"
    >
      <v-list-item-avatar size="55">
        <v-img :src="createFileAddress(item.avatar[0])"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-html="item.name"></v-list-item-title>
        <v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import { createFileAddress } from "@/services/file";
export default Vue.extend({
  props: ["channels"],
  methods: {
    createFileAddress,
  },
  data: () => ({
    benched: 0,
  }),
});
</script>