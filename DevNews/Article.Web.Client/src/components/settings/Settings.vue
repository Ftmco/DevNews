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
        item-text="name"
        item-value="id"
      >
      </v-select>
    </v-col>
  </v-card>
</template>


<script lang="ts">
import { apiCall } from "@/api";
import ApplicationService from "@/api/service/application.service";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    themes: ["Dark", "Light"],
    theme: "Light",
    langs: [{}],
    lang: "",
    applicationService: new ApplicationService(apiCall),
  }),
  created() {
    this.getLangs();
    this.setSettings();
  },
  methods: {
    changeTheme(e: any) {
      this.theme = e;
      localStorage.setItem("theme", e);
      this.$vuetify.theme.dark = this.theme == "Dark";
    },
    changeLang(e: any) {
      this.lang = e;
      const selectedLang = this.langs.find((l: any) => l.id == e) as any;
      localStorage.setItem("lang", JSON.stringify(selectedLang));
    },
    setSettings() {
      this.theme = localStorage.getItem("theme") ?? "";
      const currentLang = JSON.parse(
        localStorage.getItem("lang")?.toString() ?? ""
      );
      this.lang = currentLang.id;
    },
    getLangs() {
      this.applicationService.getLanguages().then((res) => {
        if (res.status) {
          this.langs = res.result;
        }
      });
    },
  },
});
</script>