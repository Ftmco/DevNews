<template>
  <v-list three-line expand nav>
    <v-list-item
      :to="{
        name: 'Channel',
        query: { token: channel.token, name: channel.name },
      }"
      v-for="channel in channels"
      :key="channel.token"
    >
      <v-list-item-avatar>
        <v-img :src="createFileAddress(channel.avatar[0])"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-html="channel.name"></v-list-item-title>
        <v-list-item-subtitle v-html="channel.name"></v-list-item-subtitle>
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
});
</script>