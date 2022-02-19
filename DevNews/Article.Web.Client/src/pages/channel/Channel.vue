<template>
  <v-col cols="12">
    <channel-bar :title="name" :avatar="channel.avatar" />
    <channel-posts />
    <v-footer app>
      <v-col cols="12" v-if="isIn">
        <v-col v-if="file.base64 != ''" cols="12">
          <v-row>
            <v-col cols="12" md="8">
              <v-img
                v-if="file.type.indexOf('image') > -1"
                width="50"
                height="50"
                :src="file.base64"
              />
              <video
                v-if="file.type.indexOf('video') > -1"
                controls="controls"
                :src="file.base64"
                width="100%"
                height="200"
              ></video>
              <audio
                width="100%"
                controls="controls"
                autoplay="autoplay"
                :src="file.base64"
                v-if="file.type.indexOf('audio') > -1"
              ></audio>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip>{{ file.ogName }} </v-chip>
              <v-icon @click="file = { base64: '' }"> mdi-close-circle</v-icon>
            </v-col>
          </v-row>
        </v-col>
        <v-textarea
          hide-details
          v-if="isAdmin"
          v-model="message"
          append-icon="mdi-attachment"
          append-outer-icon="mdi-send"
          clear-icon="mdi-close-circle"
          clearable
          full-width
          auto-grow
          rows="1"
          label="Message"
          @click:append="sendOtherItems"
          @click:clear="clearMessage"
          @click:append-outer="sendMessage"
        ></v-textarea>
        <v-btn v-else text> Mute </v-btn>
      </v-col>
      <v-btn :loading="inJoining" @click="followChannel" v-else text block>
        Follow Channel
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-footer>
    <v-bottom-sheet v-model="sheet" inset>
      <v-sheet class="text-center">
        <v-col cols="12">
          <v-list-item-avatar
            @click="sendFile('image/*')"
            size="70"
            color="info"
          >
            <v-icon>mdi-image</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar
            @click="sendFile('video/*')"
            size="70"
            color="primary"
          >
            <v-icon>mdi-video</v-icon>
          </v-list-item-avatar>
          <br />
          <v-list-item-avatar
            @click="sendFile('audio/*')"
            size="70"
            color="error"
          >
            <v-icon>mdi-music</v-icon>
          </v-list-item-avatar>
          <v-spacer></v-spacer>
          <v-list-item-avatar @click="sendFile('/*')" size="70" color="warning">
            <v-icon>mdi-file</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar size="70" color="grey">
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-avatar>
        </v-col>
      </v-sheet>
    </v-bottom-sheet>
  </v-col>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import { FileModel } from "@/api/models/article.model";
import ChannelService from "@/api/service/channel.service";
import ChannelBar from "@/components/channel/ChannelBar.vue";
import ChannelPosts from "@/components/channel/ChannelPosts.vue";
import { convertToBase64File } from "@/services/file";
import { loading, showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  components: { ChannelBar, ChannelPosts },
  data: () => ({
    sheet: false,
    overlay: false,
    token: "",
    name: "",
    channel: {},
    isIn: false,
    isAdmin: false,
    inJoining: false,
    channelServices: new ChannelService(apiCall),
    message: "",
    marker: true,
    file: { base64: "", ogName: "", type: "" },
    playIcon: "mdi-play",
  }),
  beforeMount() {
    this.token = this.$route.query.token.toString();
    this.name = this.$route.query.name.toString();
    this.getChannel();
  },
  methods: {
    getChannel() {
      loading(this);
      this.channelServices
        .getChannel(this.token)
        .then((res) => {
          if (res.status) {
            this.channel = res.result.channel;
            this.isIn = res.result.isIn;
            this.isAdmin = res.result.isAdmin;
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
    followChannel() {
      this.inJoining = true;
      this.channelServices
        .followChannel(this.token)
        .then((res) => {
          if (res.status) this.isIn = true;

          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        })
        .finally(() => {
          this.inJoining = false;
        });
    },
    sendFile(accept: string) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      input.click();
      input.onchange = async () => {
        loading(this);
        convertToBase64File((input.files as any)[0]).then((res) => {
          if (res != null) {
            this.sheet = false;
            this.file = res as FileModel;
          }
          showMessage(this, "");
        });
      };
    },
    sendOtherItems() {
      this.sheet = true;
    },
    clearMessage() {
      this.message = "";
      this.file = {
        base64: "",
        ogName: "",
        type: "",
      };
    },
    playVideo() {
      const vidEl = document.getElementById("video") as HTMLVideoElement;
      if (vidEl.paused) {
        vidEl.play();
        this.overlay = false;
        this.playIcon = "mdi-stop-circle-outline";
      } else {
        vidEl.pause();
        this.playIcon = "mdi-play";
      }
    },
    sendMessage() {
      loading(this);
      this.channelServices
        .sendMessage({
          message: this.message,
          token: this.token,
          file: this.file,
        })
        .then((res) => {
          if (res.status) {
            this.clearMessage();
            (this.$root.$refs as any).addPost([res.result]);
          }
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
  },
});
</script>