<template>
  <item>
    <template slot="title">
      <v-card-title>
        <v-list-item-avatar>
          <v-img :src="channel.avatar" :lazy-src="channel.avatar" />
        </v-list-item-avatar>
        <v-toolbar-title>{{ channel.name }}</v-toolbar-title>
      </v-card-title>
    </template>
  </item>
</template>

<script lang="ts">
import Vue from "vue";
import Item from "@/components/article/Item.vue";
export default Vue.extend({
  data: () => ({
    show: false,
    channel: {
      name: "DotNet",
      avatar:
        "http://192.168.43.198:2050/files/channel/4fa210f8-b1bc-4392-b9c1-d6d031bafb441641323872410.png",
      mute: true,
      notift: "Mute",
    },
  }),
  components: { Item },
});
</script>