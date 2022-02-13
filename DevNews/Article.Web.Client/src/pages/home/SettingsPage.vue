<template>
  <v-col cols="12">
    <profile />
    <br />
    <settings />
    <br />
    <br />
    <br />
  </v-col>
</template>

<script lang="ts">
import Profile from "@/components/account/Profile.vue";
import Settings from "@/components/settings/Settings.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    Profile,
    Settings,
  },
});
</script>
Profile