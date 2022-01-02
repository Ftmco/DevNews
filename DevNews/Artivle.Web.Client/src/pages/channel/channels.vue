<template>
  <v-card class="mx-auto" tile>
    <v-list rounded>
      <v-text-field outlined placeholder="Search" label="Search" />
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="(channel, i) in channels"
          :key="i"
          :to="{ name: 'Channel', query: { token: channel.token } }"
        >
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-chip color="error">5</v-chip>
          </v-list-item-avatar>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import Vue from "vue";
import ChannelService from "@/api/service/channel.service";
import { messages } from "@/constants";
export default Vue.extend({
  data: () => ({
    selectedItem: 1,
    channels: [],
    channelService: new ChannelService(apiCall),
  }),
  methods: {
    getChannels() {
      (this.$root.$refs.loading as any).open();
      this.channelService
        .getChannels()
        .then((res) => {
          if (res.status) this.channels = res.result;
          this.showMessage(res.title);
        })
        .catch((e) => {
          this.showMessage(messages.netWorkError(e.message).title);
        });
    },

    showMessage(text: string) {
      (this.$root.$refs.loading as any).close();
      (this.$root.$refs.snackbar as any).open(text);
    },
  },
});
</script>