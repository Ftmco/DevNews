<template>
  <v-col cols="12">
    <div v-for="file in files" :key="file.id">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card>
            <v-img
              v-if="file.type.indexOf('image/') != -1"
              :src="createFileAddress(file)"
              :lazy-src="createFileAddress(file)"
            />
            <v-chip v-else>
              {{ file.name }}
            </v-chip>
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#036358">
                <v-btn icon>
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-card>
        </template>
      </v-hover>
    </div>
  </v-col>
</template>


<script lang="ts">
import Vue from "vue";
import { createFileAddress } from "@/services/file";
export default Vue.extend({
  props: {
    files: Array,
  },
  methods: {
    createFileAddress,
  },
});
</script>