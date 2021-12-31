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
    <TheSnackbar />
    <TheLoading />
  </v-app>
</template>

<script>
import AppBar from "~/components/core/AppBar.vue";
import BottomNavigation from "~/components/core/BottomNavigation.vue";
import NavigationDrawer from "~/components/core/NavigationDrawer.vue";
import TheSnackbar from "~/components/core/TheSnackbar.vue";
import TheLoading from "~/components/core/TheLoading.vue";
export default {
  name: "DefaultLayout",
  components: {
    BottomNavigation,
    AppBar,
    NavigationDrawer,
    TheSnackbar,
    TheLoading,
  },
};
</script>
