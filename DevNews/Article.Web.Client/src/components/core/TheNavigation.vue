<template>
  <v-navigation-drawer v-model="drawer" fixed temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="text--accent-4">
        <v-list-item :to="{ name: 'Settings' }" v-if="user.isAuthenticated">
          <v-col align="center">
            <v-list-item-avatar size="100" color="grey">
              <v-img
                :src="createFileAddress(user.profile.image[0])"
                :lazy-src="createFileAddress(user.profile.image[0])"
              />
            </v-list-item-avatar>
            <v-list-item-link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{user.profile.fullName}}
                </v-list-item-title>
                <v-list-item-subtitle>{{user.profile.email || user.profile.mobileNo}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item-link>
          </v-col>
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.id" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeTheme">
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ theme }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append v-if="user.isAuthenticated">
      <div class="pa-2">
        <v-btn
          block
          color="error"
          class="rounded-xl"
          elevation="10"
          @click="logOut"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>


<script lang="ts">
import Vue from "vue";
import { navigationItems } from "@/constants/";
import Account from "@/services/account";
import AccountServiec from "@/api/service/account.service";
import { apiCall } from "@/api";
import ProfileService from "@/api/service/profile.service";
import { createFileAddress } from "@/services/file";

export default Vue.extend({
  data: () => ({
    drawer: false,
    user: {
      isAuthenticated: Account.isAuthenticated(),
      profile: {},
    },
    items: navigationItems,
    group: null,
    accountServices: new AccountServiec(apiCall),
    profileService: new ProfileService(apiCall),
    theme: "Light",
    active: 0,
  }),
  created() {
    this.$root.$refs.navigationDrawer = this;
    this.getUser();
  },
  methods: {
    open() {
      this.drawer = true;
    },
    getUser() {
      let currentUserAuthenticated = Account.isAuthenticated();
      if (currentUserAuthenticated) {
        this.profileService.getProfile().then((res) => {
          if (res.status) {
            this.user.isAuthenticated = true;
            this.user.profile = res.result;
          }
        });
      }
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.theme = this.$vuetify.theme.dark ? "Dark" : "Light";
      localStorage.setItem("theme", this.theme);
    },
    logOut() {
      this.accountServices.LogOut().then(() => {
        (window.location as any) = "/account/login";
      });
    },
    createFileAddress,
  },
});
</script>