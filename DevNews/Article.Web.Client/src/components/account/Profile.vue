<template>
  <v-card elevation="5">
    <v-col cols="12">
      <v-card-title>Profile</v-card-title>
      <v-list-item>
        <v-col align="left">
          <v-list-item-avatar size="100" color="grey">
            <v-img
              :src="createFileAddress(profile.image[0])"
              :lazy-src="createFileAddress(profile.image[0])"
            />
          </v-list-item-avatar>
          <v-list-item-link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ profile.fullName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                profile.email || profile.mobileNo
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item-link>
        </v-col>
      </v-list-item>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.userName"
            outlined
            label="User Name"
            placeholder="User Name"
            readonly
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
            label="Full Name"
            placeholder="Full Name"
            readonly
        /></v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ProfileService from "@/api/service/profile.service";
import { showMessage } from "@/services/message";
import { createFileAddress } from "@/services/file";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    profileService: new ProfileService(apiCall),
    profile: {},
  }),
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.profileService
        .getProfile()
        .then((res) => {
          if (res.status) this.profile = res.result;
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
    createFileAddress,
  },
});
</script>