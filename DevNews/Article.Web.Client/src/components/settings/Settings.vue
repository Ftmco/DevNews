<template>
  <v-card elevation="5">
    <v-col cols="12">
      <v-card-title>Settings</v-card-title>
      <v-select
        @input="changeTheme"
        label="Theme"
        placeholder="Theme"
        outlined
        v-model="theme"
        :items="themes"
      >
      </v-select>
      <v-select
        @input="changeLang"
        label="Language"
        placeholder="Language"
        outlined
        v-model="lang"
        :items="langs"
      >
      </v-select>
    </v-col>
  </v-card>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    themes: ["Dark", "Light"],
    theme: "Light",
    langs: ["En-UK", "Fa-IR"],
    lang: "En-UK",
  }),
  created() {
    this.theme = localStorage.getItem("theme") ?? "";
  },
  methods: {
    changeTheme(e: any) {
      this.theme = e;
      localStorage.setItem("theme", e);
      this.$vuetify.theme.dark = this.theme == "Dark";
    },
  },
});
</script>