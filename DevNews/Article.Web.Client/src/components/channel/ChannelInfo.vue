<template>
  <app-dialog :title="title" :titleColor="color">
    <template v-slot:body>
      <v-col cols="12" align="center">
        <v-card elevation="5">
          <v-col cols="12">
            <v-card-title>Channel Info</v-card-title>
            <v-list-item-avatar width="250px" height="250px">
              <v-img
                class="rounded-xl elevation-5"
                :src="main"
                :lazy-src="main"
              />
            </v-list-item-avatar>
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
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="Name"
                  readonly
                  v-model="channel.name"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="Link"
                  readonly
                  v-model="channel.link"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-card>
        <br />
        <v-card elevation="5">
          <v-col cols="12">
            <v-card-title>Owner Info</v-card-title>
            <v-row>
              <v-col cols="12">
                <v-list-item-avatar width="150px" height="150px">
                  <v-img
                    class="rounded-xl elevation-5"
                    :src="main"
                    :lazy-src="main"
                  />
                </v-list-item-avatar>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="Owner Email"
                  readonly
                  v-model="owner.email"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="Owner User Name"
                  readonly
                  v-model="owner.userName"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-card>
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
    channel: Object,
    owner: Object,
    title: String,
    color: String,
  },
  data: () => ({
    main: "",
    images: [],
  }),
  mounted() {
    this.$root.$refs.channelInfo = this;
  },
  methods: {
    open() {
      openDialog(this);
      this.setMain(this.channel.avatar[0]);
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