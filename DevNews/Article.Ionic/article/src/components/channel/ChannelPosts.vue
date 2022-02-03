<template>
  <post-item v-for="(post, i) in posts" :key="i" :post="post" />
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import { showToast } from "@/services/components/Toast";
import { defineComponent } from "vue";
import PostItem from "./PostItem.vue";

export default defineComponent({
  props: {
    channToken: {
      type: String,
      default: "",
    },
  },
  components: {
    PostItem,
  },
  data: () => ({
    posts: [],
    channelServices: new ChannelService(apiCall),
  }),
  created() {
    this.getPosts(this.channToken);
  },
  methods: {
    getPosts(token: string) {
      this.channelServices.getChannelPosts(token).then((res) => {
        if (res.status) {
          this.posts = res.result;
        }
        showToast(res.title);
      });
    },
  },
});
</script>
