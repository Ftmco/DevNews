<template>
  <div class="temprory-container">
    <div
      class="temprory-item"
      v-for="temprory in channelsTemprory"
      :key="temprory.id"
    >
      <v-list-item-avatar size="60">
        <v-img
          :src="temprory.channelAvatar"
          :lazy-src="temprory.channelAvatar"
          width="250"
        ></v-img>
      </v-list-item-avatar>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import dragScroll from '@/services/dragscroll'
export default Vue.extend({
  data: () => ({
    channelsTemprory: [
      {
        id: 0,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 1,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 2,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 3,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 4,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },

      {
        id: 5,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },

      {
        id: 6,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },

      {
        id: 7,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 8,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 9,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 10,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 11,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 12,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 13,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 14,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 15,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 16,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 17,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 18,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 19,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
      {
        id: 20,
        channelAvatar: "http://192.168.43.198:8080/img/login.9c165301.png",
      },
    ],
  }),
  mounted(){
dragScroll('.temprory-container')
  },
  methods: {},
});
</script>

<style scoped>
@import "../../assets/style/channel.css";
</style>