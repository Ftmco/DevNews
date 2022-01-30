<template>
  <v-list rounded>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(channel, i) in channels"
        :key="i"
        :to="{
          name: 'Channel',
          query: { token: channel.token, name: channel.name },
        }"
      >
        <v-list-item-avatar>
          <v-img
            :src="createFileAddress(channel.avatar[0])"
            :lazy-src="createFileAddress(channel.avatar[0])"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="channel.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar v-if="channel.newPosts > 0">
          <v-chip color="error">{{ channel.newPosts }}</v-chip>
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import { createFileAddress } from "@/services/file";
export default Vue.extend({
  props: {
    channels: [],
  },
  methods: {
    createFileAddress,
  },
});
</script>