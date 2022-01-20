<template>
  <div>
    <v-card>
      <ChannelTemprory />
    </v-card>
    <!-- <v-col cols="12">
      <v-row>
        <home-items v-for="i in 25" :key="i" />
      </v-row>
    </v-col> -->
  </div>
</template>

<script lang="ts">
import ChannelTemprory from "@/components/channel/ChannelTemprory.vue";
import HomeItems from "@/components/home/HomeItems.vue";
import Vue from "vue";

export default Vue.extend({
  components: { ChannelTemprory, HomeItems },
});
</script>,
    HomeItems
