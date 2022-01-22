<template></template>


<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import { messages } from "@/constants";
import { loading, showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  props: {
    channelToken: String,
  },
  data: () => ({
    channelServices: new ChannelService(apiCall),
  }),
  beforeMount() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      loading(this);
      this.channelServices
        .getChannelPosts(this.channelToken)
        .then((res) => {
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e).message);
        });
    },
  },
});
</script>