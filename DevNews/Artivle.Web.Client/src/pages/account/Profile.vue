<template>
  <v-col cols="12">
    <v-col cols="12" align="center">
      <v-list-item-avatar size="200" color="grey">
        <v-img :src="profile.image" :lazy-src="profile.image" />
      </v-list-item-avatar>
      <v-file-input
        @change="profileSelect"
        placeholder="User Profile"
        label="User Profile"
        prepend-icon="mdi-paperclip"
      >
        <template v-slot:selection="{ text }">
          <v-chip small label color="primary">
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Full Name"
            v-model="profile.fullName"
            :rules="[rules.require]"
            outlined
            clearable
            placeholder="Full Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Email"
            v-model="profile.email"
            :rules="[rules.require]"
            outlined
            clearable
            placeholder="Email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Mobile No"
            v-model="profile.phoneNumber"
            :rules="[rules.require]"
            outlined
            clearable
            placeholder="Mobile No"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="User Name"
            v-model="profile.userName"
            :rules="[rules.require]"
            outlined
            clearable
            placeholder="User Name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="primary" outlined @click="changeProfile"> Update </v-btn>
    </v-col>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import ProfileService from "@/api/service/profile.service";
import { apiCall } from "@/api";
import { messages, rules } from "@/constants";
import { message } from "ant-design-vue";
export default Vue.extend({
  data: () => ({
    profileService: new ProfileService(apiCall),
    profile: {
      image: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      userName: "",
    },
    rules: rules,
  }),
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      (this.$root.$refs.loading as any).open();
      this.profileService
        .getProfile()
        .then((res) => {
          if (res.status) this.profile = res.result;
          this.showMessage(res.title);
        })
        .catch((e) => {
          console.log(e);

          this.showMessage(messages.netWorkError(e.message).title);
        });
    },
    changeProfile() {
      (this.$root.$refs.loading as any).open();
      this.profileService
        .updateProfile(this.profile)
        .then((res) => {
          if (res.status) this.profile = res.result;
          this.showMessage(res.title);
        })
        .catch((e) => {
          this.showMessage(messages.netWorkError(e).title);
        });
    },
    profileSelect(file: any) {
      if (file != null) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          this.profile.image = fileReader.result;
        };
      }
    },
    showMessage(text: string) {
      (this.$root.$refs.loading as any).close();
      (this.$root.$refs.snackbar as any).open(text);
    },
  },
});
</script>