<template>
  <v-card elevation="5">
    <v-col cols="12">
      <v-card-title>Profile</v-card-title>
      <v-list-item v-if="profile != null">
        <v-col align="left">
          <v-list-item-avatar size="100" color="grey">
            <v-img :src="imgSrc" :lazy-src="imgSrc" />
          </v-list-item-avatar>
          <v-file-input
            accept="image/*"
            show-size
            chips
            v-if="inEdit"
            label="Profile Image"
            placeholder="Profile Image"
            @change="selectProfile"
          ></v-file-input>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ profile.fullName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                profile.email || profile.mobileNo
              }}</v-list-item-subtitle>
              <v-btn
                class="col-md-3"
                outlined
                :color="inEdit ? 'primary' : 'warning'"
                @click="edit"
              >
                {{ inEdit ? "Update Profile" : "Edit Profile" }}
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-list-item>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.userName"
            :clearable="inEdit"
            outlined
            label="User Name"
            placeholder="User Name"
            :readonly="!inEdit"
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.email"
            outlined
            label="E-main"
            placeholder="E-mail"
            readonly
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.mobileNo"
            outlined
            label="Mobile"
            placeholder="Mobile"
            readonly
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.fullName"
            outlined
            :clearable="inEdit"
            label="Full Name"
            placeholder="Full Name"
            :readonly="!inEdit"
        /></v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ProfileService from "@/api/service/profile.service";
import { showMessage } from "@/services/message";
import { convertToBase64File, createFileAddress } from "@/services/file";
import Vue from "vue";
import { FileModel } from "@/api/models/article.model";
import { cacheData } from "@/cache/CacheService";
import dragscroll from "@/services/dragscroll";
export default Vue.extend({
  data: () => ({
    profileService: new ProfileService(apiCall),
    profile: {},
    imgSrc: "",
    inEdit: false,
  }),
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.profileService
        .getProfile()
        .then((res) => {
          if (res.status) {
            this.profile = res.result;
            this.imgSrc = createFileAddress((this.profile as any).image.pop());
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
    selectProfile(e: any) {
      convertToBase64File(e).then((res: any) => {
        (this.profile as any).image = res as FileModel;
        this.imgSrc = res.base64;
      });
    },
    edit() {
      if (this.inEdit) {
        this.profileService
          .updateProfile({
            fullName: (this.profile as any).fullName,
            image: (this.profile as any).image,
            userName: (this.profile as any).userName,
          })
          .then((res) => {
            if (res.status) {
              const newCache = cacheData("profile", res);
              this.profile = newCache.result;
              this.inEdit = false;
            }
            showMessage(this, res.title);
          });
      } else {
        this.inEdit = true;
      }
    },
    createFileAddress,
  },
});
</script>

<style>
@import "../../assets/style/account.css";
@import "../../assets/style/dragscroll.css";
</style>