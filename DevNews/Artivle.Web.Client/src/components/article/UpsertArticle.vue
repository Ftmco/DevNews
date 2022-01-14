<template>
  <v-col cols="12">
    <v-form ref="upsertForm">
      <v-col cols="12" align="center">
        <v-img
          v-if="article.file.base64 != ''"
          width="300"
          height="300"
          class="rounded-xl"
          :src="article.file.base64"
          :lazy-src="article.file.base64"
        />
        <v-file-input
          :rules="[rules.require]"
          show-size
          counter
          chips
          label="Main Image"
          @change="imageSelect"
          accept="image/*"
        />
        <v-text-field
          :rules="[rules.require]"
          placeholder="Title"
          label="Title"
          outlined
          v-model="article.title"
        />
        <v-textarea
          :rules="[rules.require]"
          outlined
          placeholder="Short Description"
          label="Short Description"
          rows="5"
          v-model="article.shortDescription"
        />
        <v-select
          v-model="article.categories"
          :items="categories"
          :rules="[rules.require]"
          item-text="name"
          item-value="id"
          chips
          outlined
          label="Article Categories"
          multiple
        ></v-select>
      </v-col>
      <mavon-editor v-model="article.text" language="en" />
      <br />
      <v-switch
        v-model="article.isActive"
        :label="`Active: ${article.isActive.toString()}`"
      ></v-switch>
      <v-text-field
        placeholder="Tags"
        label="Tags Split With #"
        outlined
        v-model="article.tags"
      />
      <v-file-input
        show-size
        counter
        label="Attachments"
        multiple
        chips
        @change="fileSelect"
      />
      <v-btn color="primary" @click="createArticle" elevation="5" block>
        Send
      </v-btn>
    </v-form>
  </v-col>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import CategoryService from "@/api/service/category.service";
import { messages, rules } from "@/constants";
import { convertToBase64File } from "@/services/file";
import { loading, showMessage } from "@/services/message";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    article: {
      title: "",
      shortDescription: "",
      text: "",
      file: {
        base64: "",
        type: "",
        ogName: "",
      },
      isActive: false,
      attachments: [],
      tags: "",
      categories: [],
    },
    categories: [{}],
    rules: rules,
    groupService: new CategoryService(apiCall),
  }),
  mounted() {
    this.getGroups();
  },
  methods: {
    imageSelect(file: any) {
      convertToBase64File(file).then((res: any) => {
        this.article.file = res;
      });
    },
    fileSelect(file: any) {
      if (file.length > 0) {
        file.forEach((item: any) => {
          convertToBase64File(item).then((res: any) =>
            this.article.attachments.push(res as never)
          );
        });
      } else this.article.attachments = [];
    },
    createArticle() {
      let isValid = (this.$refs.upsertForm as any).validate();
      if (isValid) {
        this.$emit("createArticle", this.article);
      } else showMessage(this, messages.invalidForm);
    },
    getGroups() {
      loading(this);
      this.groupService
        .getCategories()
        .then((res) => {
          if (res.status) {
            this.categories = res.result;
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e).title);
        });
    },
  },
});
</script>