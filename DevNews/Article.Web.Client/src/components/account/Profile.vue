<template>
  <v-card elevation="5">
    <v-col cols="12">
      <v-card-title>Profile</v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.userName"
            outlined
            label="User Name"
            placeholder="User Name"
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.email"
            outlined
            label="E-main"
            placeholder="E-mail"
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.mobileNo"
            outlined
            label="Mobile"
            placeholder="Mobile"
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profile.fullName"
            outlined
            label="Full Name"
            placeholder="Full Name"
        /></v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ProfileService from "@/api/service/profile.service";
import { showMessage } from "@/services/message";
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
  },
});
</script>