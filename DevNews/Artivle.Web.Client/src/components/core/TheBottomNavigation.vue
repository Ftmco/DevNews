<template>
  <div v-if="show">
    <v-bottom-navigation v-model="page" shift fixed grow color="primary">
      <v-btn v-for="item in items" :key="item.id" :to="item.to">
        <span>{{ item.title }}</span>

        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bottomItems } from "@/constants/";

export default Vue.extend({
  data: () => ({
    page: 0,
    show: false,
    items: bottomItems,
  }),
  watch: {
    $route(route) {
      let meta = route.meta(route);
      if (meta.noBottomNavigation) {
        this.show = false;
      } else this.setShow();
    },
  },
  mounted() {
    this.setShow();
  },
  methods: {
    setShow() {
      this.show = window.screen.width <= 700;
    },
  },
});
</script>

<style scoped>
</style>