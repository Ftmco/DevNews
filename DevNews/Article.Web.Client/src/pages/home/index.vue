<template>
  <div>
    <v-card>
      <ChannelTemprory />
    </v-card>
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
    
