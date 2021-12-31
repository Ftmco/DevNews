<template>
  <v-bottom-navigation v-if="show" :value="value" color="teal" grow shift fixed>
    <v-btn v-for="item in items" :key="item.id" :to="item.to">
      <span>{{ item.title }}</span>

      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from "vue";
import { bottomItems } from "~/constants";
export default Vue.extend({
  data: () => ({
    show: false,
    items: bottomItems,
  }),
  mounted() {
    if (window != undefined) {
      this.show = window.screen.width <= 760;
    }
  },
});
</script>