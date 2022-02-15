<template>
  <v-main>
    <app-bar />
    <router-view />
    <the-bottom-navigation />
  </v-main>
</template>


<script lang="ts">
import AppBar from "@/components/core/AppBar.vue";
import TheBottomNavigation from "@/components/core/TheBottomNavigation.vue";
import Vue from "vue";

export default Vue.extend({
  components: { TheBottomNavigation, AppBar },
});
</script>
