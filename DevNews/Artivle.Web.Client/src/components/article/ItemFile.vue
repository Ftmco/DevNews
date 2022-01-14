<template>
  <v-col cols="12">
    <div v-for="file in files" :key="file.id">
      <v-img
        v-if="file.type.indexOf('image') != -1"
        :src="file.name"
        :lazy-src="file.name"
      />
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    files: Array,
  },
});
</script>