<template>
  <v-col cols="12">
    <v-form ref="createForm">
      <v-row>
        <v-col cols="12" align="center">
          <v-list-item-avatar size="150" color="grey">
            <v-img :src="channel.avatar" :lazy-src="channel.avatar" />
          </v-list-item-avatar>
          <v-file-input
            @change="avatarSelect"
            prepend-icon="mdi-camera"
            hide-input
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Name"
            v-model="channel.name"
            :rules="[rules.require]"
            outlined
            clearable
            placeholder="Channel Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Link"
            v-model="channel.link"
            outlined
            clearable
            placeholder="Link"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="channel.categories"
            :items="categories"
            :rules="[rules.require]"
            item-text="name"
            item-value="id"
            chips
            outlined
            label="Chips"
            multiple
          ></v-select>
        </v-col>
      </v-row>
    </v-form>

    <v-btn block color="primary" elevation="5" @click="createChannel">
      Create
    </v-btn>
  </v-col>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import CategoryService from "@/api/service/category.service";
import { messages, rules } from "@/constants";
import { convertToBase64File } from "@/services/file";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    rules: rules,
    channel: {
      name: "",
      link: "",
      avatar: "",
      categories: [],
    },
    categories: [],
    channelService: new ChannelService(apiCall),
    categoryService: new CategoryService(apiCall),
  }),
  mounted() {
    this.getCategories();
  },
  methods: {
    createChannel() {
      let isValid = (this.$refs.createForm as any).validate();
      (this.$root.$refs.loading as any).open();
      if (isValid) {
        this.channelService
          .creatChannel({
            name: this.channel.name,
            avatar: this.channel.avatar,
            link: this.channel.link,
            id: "",
            token: "",
            categories: this.channel.categories,
          })
          .then((res) => {
            this.showMessage(res.title);
          })
          .catch((e) => {
            this.showMessage(messages.netWorkError(e.message).title);
          });
      } else this.showMessage(messages.invalidForm);
    },
    getCategories() {
      (this.$root.$refs.loading as any).open();
      this.categoryService
        .getCategories()
        .then((res) => {
          if (res.status) {
            this.categories = res.result;
          }
          this.showMessage(res.title);
        })
        .catch((e) => {
          this.showMessage(messages.netWorkError(e).title);
        });
    },
    avatarSelect(file: any) {
      convertToBase64File(file)
        .then((res: any) => {
          if (res != null) {
            this.channel.avatar = res.base64;
          }
        })
        .catch((e) => {
          this.showMessage(e);
        });
    },
    showMessage(text: string) {
      (this.$root.$refs.loading as any).close();
      (this.$root.$refs.snackbar as any).open(text);
    },
  },
});
</script>