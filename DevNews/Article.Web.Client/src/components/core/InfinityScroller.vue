<template>
  <v-col cols="12" style="margin-top: 15px">
    <div class="text-center" v-if="top && inLoadin">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <slot name="body"></slot>
    <div class="text-center" v-if="!top && inLoadin">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-col>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["top", "page", "inLoadin", "finished"],
  mounted() {
    this.createScroller();
  },
  methods: {
    createScroller() {
      window.addEventListener("scroll", () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (!this.finished) {
          if (this.top) {
            if (scrollTop == 0) {
              this.$emit("NewScroll", { top: this.top, page: this.page + 1 });
            }
          } else {
            if (scrollTop + clientHeight > scrollHeight - 5) {
              this.$emit("NewScroll", { top: this.top, page: this.page + 1 });
            }
          }
        }
      });
    },
  },
});
</script>
