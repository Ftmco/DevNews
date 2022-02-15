<template>
  <v-app>
    <router-view />
    <the-loading />
    <the-snackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/core/AppBar.vue";
import TheBottomNavigation from "./components/core/TheBottomNavigation.vue";
import TheLoading from "./components/core/TheLoading.vue";
import TheSnackbar from "./components/core/TheSnackbar.vue";

export default Vue.extend({
  components: { TheBottomNavigation, AppBar, TheLoading, TheSnackbar },
  name: "App",
  mounted() {
    const theme = localStorage.getItem("theme");
    this.$vuetify.theme.dark = theme == "Dark";
  },
});
</script>
