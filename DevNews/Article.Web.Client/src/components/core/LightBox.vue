<template>
  <app-dialog :title="title" :titleColor="color">
    <template v-slot:body>
      <v-col cols="12" align="center">
        <v-img
          class="rounded-xl elevation-5"
          :src="main"
          :lazy-src="main"
          width="400px"
          height="400px"
        />

        <v-col cols="12">
          <v-row>
            <v-card
              v-for="(image, i) in images"
              :key="i"
              @click="setMain(image)"
            >
              <v-img :src="image" :lazy-src="image" />
            </v-card>
          </v-row>
        </v-col>
      </v-col>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import AppDialog from "@/components/core/AppDialog.vue";
import { closeDialog, openDialog } from "@/services/message";
import { createFileAddress } from "@/services/file";
export default Vue.extend({
  components: {
    AppDialog,
  },
  props: {
    images: [],
    title: String,
    color: String,
  },
  data: () => ({
    main: "",
  }),
  mounted() {
    this.$root.$refs.lightBox = this;
  },
  methods: {
    open() {
      openDialog(this);
      this.setMain((this.images as any)[0]);
    },
    close() {
      closeDialog(this);
    },
    setMain(image: any) {
      this.main = createFileAddress({
        directory: image.directory,
        name: image.name,
      });
    },
  },
});
</script>