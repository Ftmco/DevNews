<template>
  <v-card elevation="4">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" align="center">
          <v-img
            width="90%"
            height="350"
            v-if="article.image.base64 != ''"
            :src="article.image.base64"
            :lazy-src="article.image.base64"
          ></v-img>
          <br />
          <v-file-input
            accept="image/*"
            @change="imageSelect"
            outlined
            label="Article Image"
            placeholder="Article Image"
          ></v-file-input>
        </v-col>

        <v-col cols="12">
          <v-text-field
            outlined
            placeholder="Title"
            label="Title"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            outlined
            auto-grow
            placeholder="Short Description"
            label="Short Description"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-select
            placeholder="Categories"
            multiple
            outlined
            chips
            :items="categories"
            item-text="name"
            counter
            clearable
            deletable-chips
            item-value="id"
            open-on-clear
            v-model="article.categories"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <mavon-editor
            language="en"
            v-model="article.text"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-switch
            v-model="article.isActive"
            :label="`Article ${article.isActive ? 'Active' : 'De Active'}`"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field outlined placeholder="Tags" label="Tags"></v-text-field>
        </v-col>
      </v-row>

      <v-btn color="primary" block elevation="5"> Create Article </v-btn>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import { FileModel } from "@/api/models/article.model";
import CategoryService from "@/api/service/category.service";
import { convertToBase64File } from "@/services/file";
import { showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    categoryServices: new CategoryService(apiCall),
    article: {
      title: "",
      shortDescription: "",
      text: "### Write Your Text...",
      image: {
        base64: "",
        ogName: "",
        type: "",
      },
      attechmentFiles: [{ base64: "", ogName: "", type: "" }],
      categories: [],
      tags: "",
      owner: 0,
      ownerToken: "",
      isActive: true,
    },
    categories: [],
    toolbars: {
      bold: true, // 粗体
      italic: true, // 斜体
      header: true, // 标题
      underline: true, // 下划线
      strikethrough: true, // 中划线
      mark: true, // 标记
      superscript: true, // 上角标
      subscript: true, // 下角标
      quote: true, // 引用
      ol: true, // 有序列表
      ul: true, // 无序列表
      link: true, // 链接
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: true, // 全屏编辑
      readmodel: true, // 沉浸式阅读
      htmlcode: true, // 展示html源码
      help: true, // 帮助
      /* 1.3.5 */
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      save: true, // 保存（触发events中的save事件）
      /* 1.4.2 */
      navigation: true, // 导航目录
      /* 2.1.8 */
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      /* 2.2.1 */
      subfield: true, // 单双栏模式
      preview: true, // 预览
    },
  }),
  created() {
    this.getCategories();
  },
  methods: {
    imageSelect(e: any) {
      convertToBase64File(e).then((res) => {
        if (res != null) {
          this.article.image = res as FileModel;
        } else this.article.image = { base64: "", ogName: "", type: "" };
      });
    },
    getCategories() {
      this.categoryServices.getCategories().then((res) => {
        if (res.status) this.categories = res.result;
        showMessage(this, res.title);
      });
    },
  },
});
</script>