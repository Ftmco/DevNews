<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/core/AppBar.vue";
import TheBottomNavigation from "./components/core/TheBottomNavigation.vue";

export default Vue.extend({
  components: { TheBottomNavigation, AppBar },
  name: "App",
  mounted() {
    const theme = localStorage.getItem("theme");
    this.$vuetify.theme.dark = theme == "Dark";
  },
});
</script>
