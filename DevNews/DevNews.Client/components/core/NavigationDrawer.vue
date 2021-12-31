<template>
  <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { navigationItems } from "~/constants";
export default Vue.extend({
  data: () => ({
    drawer: false,
    miniVariant: false,
    items: navigationItems,
  }),
  created() {
    this.$root.$refs.NavigationDrawer = this;
  },
  methods: {
    oplose() {
      this.drawer = !this.drawer;
    },
    mini() {
      this.miniVariant = !this.miniVariant;
    },
  },
});
</script>