<template>
  <h2>Articles</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    channelToken: {
      type: String,
      default: "",
    },
  },
});
</script>
