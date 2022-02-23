<template>
  <v-col cols="12">
    <channel-bar :title="channel.name" :avatar="channel.avatar" />
    <br /><br />
    <v-card elevation="4">
      <v-card-title>Channel Info</v-card-title>
      <br />
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              outlined
              placeholder="Name"
              label="Name"
              v-model="channel.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              outlined
              placeholder="Link"
              label="Link"
              v-model="channel.link"
            ></v-text-field>
          </v-col>
          <v-col v-if="isAdmin" cols="12" md="4" sm="6">
            <v-text-field
              outlined
              label="Token"
              placeholder="Token"
              v-model="channel.token"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="isAdmin">
          <v-col cols="12" md="6">
            <v-btn outlined block color="warning" elevation="5">
              Edit
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn outlined block color="error" elevation="5">
              Delete
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
    <br />
    <v-card elevation="4" v-if="isAdmin">
      <v-card-title>Channel Owner</v-card-title>
      <br />
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              outlined
              placeholder="E-main"
              label="E-main"
              v-model="owner.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              outlined
              placeholder="User Name"
              label="User Name"
              v-model="owner.userName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              outlined
              label="Token"
              placeholder="Token"
              v-model="owner.token"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
    <br />
    <v-card elevation="4" v-if="isAdmin">
      <v-card-title>Channel Users</v-card-title>
      <br />
      <v-col cols="12">
       
      </v-col>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import ChannelBar from "@/components/channel/ChannelBar.vue";
import { createFileAddress } from "@/services/file";
import { showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  components: { ChannelBar },
  data: () => ({
    channel: {},
    isAdmin: false,
    owner: {},
    channelService: new ChannelService(apiCall),
  }),
  mounted() {
    this.getChannelInfo();
  },
  methods: {
    getChannelInfo() {
      this.channelService
        .getChannel(this.$route.query.token.toString())
        .then((res) => {
          if (res.status) {
            this.channel = res.result.channel;
            this.isAdmin = res.result.isAdmin;
            this.owner = res.result.owner;
          }
          showMessage(this, res.title);
        });
    },
  },
});
</script>