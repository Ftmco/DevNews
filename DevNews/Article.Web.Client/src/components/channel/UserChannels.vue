<template>
  <v-card elevation="5">
    <v-col cols="12">
      <v-card-title>My Channels</v-card-title>
      <channels-list :channels="channels" />
      <v-card-actions>
        <v-btn color="primary" fab @click="newChannel">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-col>
    <app-dialog title="Create New Channel" titleColor="primary">
      <template v-slot:body>
        <create-channel @ChannelCreated="addNewChannel" />
      </template>
    </app-dialog>
  </v-card>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import ChannelService from "@/api/service/channel.service";
import { closeDialog, openDialog, showMessage } from "@/services/message";
import Vue from "vue";
import AppDialog from "../core/AppDialog.vue";
import ChannelsList from "./ChannelsList.vue";
import CreateChannel from "./CreateChannel.vue";
export default Vue.extend({
  components: { ChannelsList, AppDialog, CreateChannel },
  data: () => ({
    channels: [{}],
    channelServices: new ChannelService(apiCall),
  }),
  created() {
    this.getChannels();
  },
  methods: {
    getChannels() {
      this.channelServices
        .getMyChannels()
        .then((res) => {
          if (res.status) this.channels = res.result;
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
    newChannel() {
      openDialog(this);
    },
    addNewChannel(e: any) {
      this.channels.push(e);
      closeDialog(this)
    },
  },
});
</script>