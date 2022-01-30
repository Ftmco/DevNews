<template>
  <v-col>
    <v-card elevation="5">
      <v-col align="center" v-if="type == 1">
        <v-img
        v-if="file.base64 != ''"
          width="300"
          height="300"
          class="rounded-xl"
          :src="file.base64"
          :lazy-src="file.base64"
        />
        <v-file-input label="Image" @change="fileSelected" accept="image/*" />
        <v-textarea
          v-model="message"
          outlined
          label="Message"
          placeholder="Message"
          rows="5"
        ></v-textarea>
      </v-col>
    </v-card>
    <br />
    <v-btn block color="primary" elevation="7" @click="submitItems">
      Send
    </v-btn>
  </v-col>
</template>

<script lang="ts">
import { convertToBase64File } from "@/services/file";
import { showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  props: {
    type: Number,
  },
  data: () => ({
    file: {
      base64: "",
      type: "",
      ogName: "",
    },
    message: "",
  }),
  methods: {
    fileSelected(file: any) {
      convertToBase64File(file)
        .then((res: any) => {
          this.file = res;
        })
        .catch(() => {
          showMessage(this, "Exception to read file");
        });
    },
    submitItems() {
      this.$emit("submit", {
        file: this.file,
        message: this.message,
      });
    },
  },
});
</script>