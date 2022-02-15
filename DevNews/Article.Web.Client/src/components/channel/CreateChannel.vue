<template>
  <v-col cols="12">
    <v-col>
      <v-row>
        <v-col cols="12" align="left">
          <v-list-item-avatar
            v-if="channel.avatar.base64 != ''"
            size="100"
            color="grey"
          >
            <v-img
              :src="channel.avatar.base64"
              :lazy-src="channel.avatar.base64"
            />
          </v-list-item-avatar>
          <v-file-input
            accept="image/*"
            placeholder="Channel Avatar"
            chips
            show-size
            @change="avatarSelected"
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            placeholder="Name"
            label="Name"
            v-model="channel.name"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            placeholder="Link"
            label="Link"
            v-model="channel.link"
          />
        </v-col>
        <v-col cols="12">
          <v-select
            :items="categories"
            item-value="id"
            item-text="name"
            label="Categories"
            placeholder="Categoroes"
            outlined
            chips
            multiple
            v-model="channel.categories"
          ></v-select>
        </v-col>
        <v-btn @click="createChannel" block elevation="5" color="primary">
          Create Channel
        </v-btn>
      </v-row>
    </v-col>
  </v-col>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import { FileModel } from "@/api/models/article.model";
import CategoryService from "@/api/service/category.service";
import ChannelService from "@/api/service/channel.service";
import { convertToBase64File, createFileAddress } from "@/services/file";
import { loading, showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    channel: {
      name: "",
      link: "",
      avatar: {
        base64: "",
        type: "",
        ogName: "",
      },
      categories: [],
    },
    categories: [{}],
    categoryServices: new CategoryService(apiCall),
    channelServices: new ChannelService(apiCall),
  }),
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.categoryServices.getCategories().then((res) => {
        if (res.status) this.categories = res.result;
      });
    },
    avatarSelected(e: any) {
      convertToBase64File(e).then((res) => {
        if (res != null) {
          this.channel.avatar = res as FileModel;
        } else this.channel.avatar = { base64: "", type: "", ogName: "" };
      });
    },
    createChannel() {
      loading(this);
      this.channelServices
        .createChannel({
          ...this.channel,
          id: "",
          token: "",
        })
        .then((res) => {
          if (res.status) {
            this.$emit("ChannelCreated", res.result);
          }

          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
  },
});
</script>