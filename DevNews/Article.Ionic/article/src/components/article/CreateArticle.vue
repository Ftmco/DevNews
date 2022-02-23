<template>
  <ion-content>
    <ion-card>
      <ion-header>
        <ion-toolbar>
          <ion-title>Create New Article</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card-content mode="ios">
        <ion-img
          v-if="article.image.base64 != ''"
          :src="article.image.base64"
        />
        <ion-button
          size="default"
          expand="block"
          fill="outline"
          color="primary"
          @click="selectFile(false)"
        >
          Select Image
          <ion-icon :icon="image"></ion-icon>
        </ion-button>
        <ion-item>
          <ion-label position="floating">Title</ion-label>
          <ion-input
            placeholder="Title"
            v-model="article.title"
            clear-input
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Short Description</ion-label>
          <ion-textarea
            placeholder="Short Decruption"
            v-model="article.shortDescription"
            auto-grow
          ></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Text</ion-label>
          <!-- <ion-textarea placeholder="Text" auto-grow></ion-textarea> -->
          <QuillEditor
            :toolbar="toolbarOptions"
            contentType="html"
            theme="snow"
            v-model:content="article.text"
            :enable="true"
          />
        </ion-item>
        <ion-item>
          <ion-label>Categories</ion-label>
          <ion-select
            v-model="article.categories"
            required
            clear-input
            multiple="true"
            cancel-text="Cancel"
            ok-text="Ok"
          >
            <ion-select-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</ion-select-option
            >
          </ion-select>
        </ion-item>
        <ion-button
          size="default"
          expand="block"
          fill="outline"
          color="primary"
          @click="selectFile(true)"
        >
          Select Attachemnt Files
        </ion-button>
        <ion-row>
          <ion-chip v-for="(atfile, i) in article.attechmentFiles" :key="i">
            {{ atfile.ogName }}
          </ion-chip>
        </ion-row>
        <ion-button
          size="default"
          expand="block"
          color="primary"
          @click="createArticle"
        >
          Create Article
        </ion-button>
      </ion-card-content>
    </ion-card>
    <input type="file" id="fileInput" hidden />
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonIcon,
  IonRow,
  IonChip,
  IonImg,
} from "@ionic/vue";
import { image } from "ionicons/icons";
import CategoryService from "@/api/service/category.service";
import { apiCall } from "@/api";
import { convertToBase64File } from "@/services/file";
import { FileModel } from "@/api/models/article.model";
import ArticleService from "@/api/service/article.service";
import { showToast } from "@/services/components/Toast";

export default defineComponent({
  components: {
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonContent,
    IonRow,
    IonChip,
    IonImg,
  },
  data: () => ({
    article: {
      id: undefined,
      text: "",
      shortDescription: "",
      title: "",
      categories: [],
      image: { base64: "", ogName: "", type: "" },
      attechmentFiles: [],
    },
    categories: [],
    categoryServices: new CategoryService(apiCall),
    toolbarOptions: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
    image,
    articleService: new ArticleService(apiCall),
  }),
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.categoryServices.getCategories().then((res) => {
        if (res.status) {
          this.categories = res.result;
        }
      });
    },
    selectFile(multi: boolean) {
      const element = document.getElementById("fileInput") as HTMLInputElement;
      element.multiple = multi;
      if (!multi) element.accept = "image/*";
      else element.accept = "*";
      element.click();
      element.onchange = (e) => {
        this.fileSelected(e, multi);
      };
    },
    fileSelected(e: any, multi: boolean) {
      if (!multi) {
        convertToBase64File(e.target.files[0]).then((res) => {
          this.article.image = res as FileModel;
        });
      } else {
        for (const file in e.target.files) {
          if (Object.prototype.hasOwnProperty.call(e.target.files, file)) {
            const item = e.target.files[file];
            convertToBase64File(item).then((res) => {
              this.article.attechmentFiles.push(res as never);
            });
          }
        }
      }
    },
    createArticle() {
      this.articleService.createArticle(this.article).then((res) => {
        showToast(res.title);
      });
    },
  },
});
</script>
