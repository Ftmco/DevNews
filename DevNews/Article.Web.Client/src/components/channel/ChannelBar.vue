<template>
  <v-app-bar app color="primary" dark>
    <v-btn icon @click="back">
      <v-icon>mdi-backburger</v-icon>
    </v-btn>
    <v-list-item-avatar @click="avatarClieck">
      <v-img
        :src="createFileAddress(channel.avatar[0])"
        :lazy-src="createFileAddress(channel.avatar[0])"
      />
    </v-list-item-avatar>
    <v-spacer></v-spacer>
    <v-toolbar-title @click="avatarClieck">{{ channel.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="leave">
          <v-list-item-title>
            Leave
            <v-icon>mdi-logout</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import { messages } from "@/constants";
import { createFileAddress } from "@/services/file";
import { openChannelInfo, openLightBox, showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  props: {
    channel: Object,
  },
  data: () => ({
    channelService: new ChannelService(apiCall),
  }),
  methods: {
    back() {
      this.$router.back();
    },
    leave() {
      this.channelService
        .leave(this.channel.token)
        .then((res) => {
          if (res.status) {
            this.$router.push({ name: "Channels" });
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, messages.netWorkError(e).title);
        });
    },
    avatarClieck() {
      openChannelInfo(this);
    },
    createFileAddress,
  },
});
</script>