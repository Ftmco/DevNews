<template>
  <div style="margin-top: 35px">
    <infinity-scroller
      :finished="totalCount == posts.length"
      :inLoadin="inLoading"
      :page="page"
      @NewScroll="loadPosts"
      :top="true"
    >
      <template v-slot:body>
        <div>
          <post
            v-for="(post, i) in posts"
            :post="post"
            :key="i"
            :lastIndex="posts.length === i + 1"
          />
        </div>
      </template>
    </infinity-scroller>
  </div>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import Vue from "vue";
import InfinityScroller from "../core/InfinityScroller.vue";
import Post from "./Post.vue";
export default Vue.extend({
  components: { InfinityScroller, Post },
  data: () => ({
    posts: [],
    inLoading: false,
    page: 0,
    totalCount: 10,
    channelService: new ChannelService(apiCall),
    token: "",
  }),
  mounted() {
    this.token = this.$route.query.token.toString() ?? "";
    this.loadPosts({ top: true, page: this.page });
    (this.$root.$refs.addPost as any) = this.newPost;
  },
  methods: {
    loadPosts(e: any) {
      this.inLoading = true;
      this.channelService
        .getChannelPosts(this.token, e.page)
        .then((res) => {
          if (res.status) {
            this.posts = this.createList(
              this.posts.reverse(),
              res.result.posts
            );
            this.totalCount = res.result.totalCount;
          }
        })
        .finally(() => {
          this.inLoading = false;
          this.page = e.page;
          if (e.page == 0) {
            window.scrollTo({ top: document.body.clientHeight });
          } else window.scrollTo({ top: 300 });
        });
    },
    newPost(post: any) {
      this.posts = this.createList(this.posts, post);
      window.scrollTo({ top: document.body.clientHeight });
    },
    createList(current: never[], newlist: []) {
      const list = [...current, ...newlist];
      return list.reverse();
    },
  },
});
</script>