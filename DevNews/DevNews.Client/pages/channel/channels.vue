<template>
  <v-card class="mx-auto" tile>
    <v-list shaped>
      <v-subheader>Channels</v-subheader>
      <list-item
        v-for="channel in channels"
        :channel="channel"
        :key="channel.id"
      />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import listItem from "~/components/channel/listItem.vue";
export default Vue.extend({
  components: { listItem },
  name: "Channels",
  head: () => ({
    title: "Channels",
  }),
  data: () => ({
    channels: [
     
    ],
  }),
});
</script>