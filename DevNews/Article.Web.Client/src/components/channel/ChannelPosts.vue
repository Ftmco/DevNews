<template>
  <v-col>
    <item v-for="post in posts" :key="post.id" :post="post" />
  </v-col>
</template>


<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import { messages } from "@/constants";
import { loading, showMessage } from "@/services/message";
import Item from "@/components/post/Item.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    Item,
  },
  props: {
    channelToken: String,
  },
  data: () => ({
    channelServices: new ChannelService(apiCall),
    posts: [],
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
          if (res.status)
            res.result.forEach((post: never) => this.posts.push(post));
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e).message);
        });
    },
  },
});
</script>