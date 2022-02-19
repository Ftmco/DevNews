<template>
  <v-card
    elevation="4"
    width="100%"
    :style="
      lastIndex ? 'margin-top:10px;margin-bottom:100px' : 'margin-top:10px'
    "
  >
    <v-col cols="12" v-if="post.files.length > 0">
      <div v-for="file in post.files" :key="file.id">
        <v-col align="center">
          <v-img
            height="350"
            width="100%"
            v-if="file.type.indexOf('image') > -1"
            :src="createFileAddress(file)"
            :lazy-src="createFileAddress(file)"
          ></v-img>
          <video
            controls
            height="300"
            width="350"
            v-if="file.type.indexOf('video') > -1"
            :src="createFileAddress(file)"
          ></video>
          <audio
            width="100"
            controls
            v-if="file.type.indexOf('audio') > -1"
            :src="createFileAddress(file)"
          ></audio>
          <v-chip v-if="file.name != ''">
            {{ file.orginalName }}
            <v-icon>mdi-download</v-icon>
          </v-chip>
        </v-col>
      </div>
    </v-col>
    <v-card-text>
      <div>{{ post.message }}</div>
    </v-card-text>
    <v-card-subtitle>{{post.createDate}}</v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { createFileAddress } from "@/services/file";
import Vue from "vue";
export default Vue.extend({
  props: ["post", "lastIndex"],
  methods: {
    createFileAddress,
  },
});
</script>