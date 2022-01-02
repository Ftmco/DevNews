<template>
  <div>
    <v-card>
      <ChannelTemprory />
    </v-card>
  </div>
</template>

<script lang="ts">
import ChannelTemprory from "@/components/channel/ChannelTemprory.vue";
import Vue from "vue";

export default Vue.extend({
  components: { ChannelTemprory },
});
</script>
