<template>
  <v-app-bar app @click="channelInfo">
    <div class="d-flex align-center">
      <v-btn icon @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-list-item-avatar size="45" color="grey">
        <v-img
          v-if="avatar != null"
          :src="createFileAddress(avatar[0])"
          :lazy-src="createFileAddress(avatar[0])"
        />
      </v-list-item-avatar>
      <v-card-title>{{ title }}</v-card-title>
      <v-spacer></v-spacer>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { createFileAddress } from "@/services/file";
export default Vue.extend({
  props: ["title", "avatar"],
  methods: {
    createFileAddress,
    back() {
      this.$router.back();
    },
    channelInfo() {
      this.$router.push({ name: "ChannelInfo", query: this.$route.query });
    },
  },
});
</script>