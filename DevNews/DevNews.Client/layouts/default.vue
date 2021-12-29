<template>
  <v-app dark>
    <navigation-drawer />
    <app-bar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <bottom-navigation />
  </v-app>
</template>

<script>
import AppBar from "~/components/core/AppBar.vue";
import BottomNavigation from "~/components/core/BottomNavigation.vue";
import NavigationDrawer from "~/components/core/NavigationDrawer.vue";
export default {
  name: "DefaultLayout",
  components: {
    BottomNavigation,
    AppBar,
    NavigationDrawer,
  },
};
</script>
