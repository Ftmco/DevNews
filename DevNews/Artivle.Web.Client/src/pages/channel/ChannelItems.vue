<template>
  <div>
    <channel-bar :channel="channel" />
    <v-col cols="12">
      <v-row>
        <item v-for="i in 20" :key="i" />
      </v-row>
    </v-col>
    <v-footer fixed height="60">
      <v-col class="text-center" cols="12" @click="mute">
        {{ channel.notift }}
      </v-col>
    </v-footer>
  </div>
</template>

<script lang="ts">
import ChannelBar from "@/components/channel/ChannelBar.vue";
import Item from "@/components/channel/Item.vue";
import Vue from "vue";
export default Vue.extend({
  components: { Item, ChannelBar },
  data: () => ({
    channel: {
      name: "DotNet",
      avatar:
        "http://192.168.43.198:2050/files/channel/4fa210f8-b1bc-4392-b9c1-d6d031bafb441641323872410.png",
      mute: true,
      notift: "Mute",
    },
  }),
  mounted() {
    window.scrollTo(0, 99999);
  },
  methods: {
    mute() {
      this.channel.mute = !this.channel.mute;
      this.channel.notift = this.channel.mute ? "Mute" : "UnMute";
    },
  },
});
</script>