<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="mx-auto rounded-b-0 item">
      <slot name="title"></slot>
      <ItemFile v-if="item.file != null" :files="item.file" />

      <v-card-title v-if="item.type == 0">
        {{ item.title }}
      </v-card-title>

      <v-card-subtitle> {{ item.message }} </v-card-subtitle>

      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show" v-if="item.type == 0">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition v-if="item.type == 0">
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ item.shortDescription }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import ItemFile from "./ItemFile.vue";
export default Vue.extend({
  props: ["item"],
  components: {
    ItemFile,
  },
  data: () => ({
    show: false,
  }),
});
</script>