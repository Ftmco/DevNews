<template>
  <v-card elevation="4" height="100%">
    <channels-list :channels="channels" />
  </v-card>
</template>


<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import ChannelsList from "@/components/channel/ChannelsList.vue";
import { showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  components: { ChannelsList },
  data: () => ({
    channelService: new ChannelService(apiCall),
    channels: [{}],
  }),
  created() {
    this.getChannels();
  },
  methods: {
    getChannels() {
      this.channelService
        .getChannels()
        .then((res) => {
          if (res.status) {
            this.channels = res.result;
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
  },
});
</script>