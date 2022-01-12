<template>
  <v-card class="mx-auto" elevation="5" tile>
    <v-list rounded>
      <v-text-field outlined placeholder="Search" label="Search" />
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="(channel, i) in channels"
          :key="i"
          :to="{
            name: 'Channel',
            query: { token: channel.token, name: channel.name },
          }"
        >
          <v-list-item-avatar>
            <v-img :src="channel.avatar" :lazy-src="channel.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="channel.name"></v-list-item-title>
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
  mounted() {
    this.getChannels();
  },
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