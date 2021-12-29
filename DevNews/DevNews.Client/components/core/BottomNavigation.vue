<template>
  <v-bottom-navigation v-if="show" :value="value" color="teal" grow shift>
    <v-btn>
      <span>Home</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn>
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>Profile</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    show: false,
  }),
  mounted() {
    if (window != undefined) {
      this.show = window.screen.width <= 760;
    }
  },
});
</script>