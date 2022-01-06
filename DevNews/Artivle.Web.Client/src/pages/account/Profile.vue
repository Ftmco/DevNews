<template>
  <div>
    <v-col cols="12" align="center">
      <v-row>
        <v-col cols="12" sm="6">
          <v-list-item-avatar size="150" color="grey">
            <v-img :src="profile.image" :lazy-src="profile.image" />
          </v-list-item-avatar>
          <v-file-input
            @change="profileSelect"
            prepend-icon="mdi-camera"
            hide-input
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-row>
            <v-col>
              <v-btn block outlined color="primary" text>Followers : 25</v-btn>
            </v-col>
            <v-col>
              <v-btn block outlined color="primary" text>Following : 25 </v-btn>
            </v-col>
            <v-col>
              <v-btn block outlined color="primary" text
                >Following Channels : 25
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-card elevation="1">
        <v-card-title> Channels </v-card-title>
        <channel-temprory />
        <v-card-actions>
          <v-btn outlined color="info" text @click="newChannel">
            Create New Channel
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
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
      <v-row>
        <v-col>
          <v-btn color="primary" block outlined @click="changeProfile">
            Update
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" block outlined>
            Settings
            <v-icon>mdi-wrench</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <app-dialog title="Create New Channel">
      <template slot="body">
        <NewChannel @channelCreated="channelCreated" />
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProfileService from "@/api/service/profile.service";
import { apiCall } from "@/api";
import { messages, rules } from "@/constants";
import ChannelTemprory from "@/components/channel/ChannelTemprory.vue";
import AppDialog from "@/components/core/AppDialog.vue";
import NewChannel from "@/components/channel/NewChannel.vue";
import { convertToBase64File } from "@/services/file";
import { showMessage } from "@/services/message";
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
  components: {
    ChannelTemprory,
    AppDialog,
    NewChannel,
  },
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
          showMessage(this,res.title);
        })
        .catch((e) => {
          console.log(e);

          showMessage(this,messages.netWorkError(e.message).title);
        });
    },
    changeProfile() {
      (this.$root.$refs.loading as any).open();
      this.profileService
        .updateProfile(this.profile)
        .then((res) => {
          if (res.status) this.profile = res.result;
          showMessage(this,res.title);
        })
        .catch((e) => {
          showMessage(this,messages.netWorkError(e).title);
        });
    },
    profileSelect(file: any) {
      convertToBase64File(file)
        .then((res: any) => {
          this.profile.image = res.base64;
        })
        .catch(() => {
          this.profile.image = "";
        });
    },
    newChannel() {
      (this.$root.$refs.dialog as any).open();
    },
    channelCreated(channel: any) {
      (this.$root.$refs.dialog as any).close();
      console.log(channel);
    },
  },
});
</script>