<template>
  <v-main>
    <app-bar />
    <router-view />
    <the-bottom-navigation />
    <the-snackbar />
    <the-loading/>
  </v-main>
</template>


<script lang="ts">
import AppBar from "@/components/core/AppBar.vue";
import TheBottomNavigation from "@/components/core/TheBottomNavigation.vue";
import TheLoading from "@/components/core/TheLoading.vue";
import TheSnackbar from "@/components/core/TheSnackbar.vue";
import Vue from "vue";

export default Vue.extend({
  components: { TheBottomNavigation, AppBar, TheSnackbar, TheLoading },
});
</script>
