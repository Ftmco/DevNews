<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>{{ title }}</v-subheader>
        <v-list-item v-for="item in items" :key="item.title" @click="emitFunc(item)">
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <v-icon>{{ item.icon }}</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["items", "title", "component"],
  data: () => ({
    sheet: false,
  }),
  created() {
    this.$root.$refs.bottomSheet = this;
  },
  methods: {
    open() {
      this.sheet = true;
    },
    close() {
      this.sheet = false;
    },
    emitFunc(item: any) {
      this.$emit("event", {
        item,
      });
    },
  },
});
</script>