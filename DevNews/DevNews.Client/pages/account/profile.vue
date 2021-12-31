<template>
  <h3>Profile</h3>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  head: () => ({
    title: "profile",
  }),
  mounted() {
    if (window != undefined) {
      if (!localStorage.getItem("Token")) {
        this.$router.push("/account/login");
      }
    }
  },
});
</script>