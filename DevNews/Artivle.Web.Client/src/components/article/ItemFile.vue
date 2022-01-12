<template>
  <v-col cols="12">
    <v-img :src="file" :lazy-src="file" />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    file: String,
  },
  data: () => ({
    mime: "",
  }),
});
</script>