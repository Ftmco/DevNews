<template>
  <v-card elevation="4" outlined style="margin-bottom: 10px">
    <post-file :files="post.files" />
    <v-card-text>
      {{ post.message }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import PostFile from "./PostFile.vue";
export default Vue.extend({
  props: {
    post: Object,
  },
  components: {
    PostFile,
  },
});
</script>