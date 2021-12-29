<template>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-app-bar-nav-icon @click.stop="open" />
    <v-btn icon @click.stop="mini">
      <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    clipped: false,
    drawer: false,
    miniVariant: false,
    title: "Dev News",
  }),
  methods: {
    open() {
      (this.$root.$refs.NavigationDrawer as any).oplose();
    },
    mini() {
      this.miniVariant = !this.miniVariant;
      (this.$root.$refs.NavigationDrawer as any).mini();
    },
  },
});
</script>