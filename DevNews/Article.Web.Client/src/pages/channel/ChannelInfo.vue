<template>
  <v-col cols="12">
    <channel-bar :title="channel.name" :avatar="channel.avatar" />
  </v-col>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import ChannelBar from "@/components/channel/ChannelBar.vue";
import { createFileAddress } from "@/services/file";
import { showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  components: { ChannelBar },
  data: () => ({
    channel: {},
    channelService: new ChannelService(apiCall),
  }),
  mounted() {
    this.getChannelInfo();
  },
  methods: {
    getChannelInfo() {
      this.channelService
        .getChannel(this.$route.query.token.toString())
        .then((res) => {
          if (res.status) {
            this.channel = res.result.channel;
          }
          showMessage(this, res.title);
        });
    },
  },
});
</script>