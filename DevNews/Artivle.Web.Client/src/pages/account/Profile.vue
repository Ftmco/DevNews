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
        <NewChannel/>
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
import { message } from "ant-design-vue";
import AppDialog from "@/components/core/AppDialog.vue";
import NewChannel from "@/components/channel/NewChannel.vue"
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
    NewChannel
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
    newChannel() {
      this.$root.$refs.dialog.open();
    },
    showMessage(text: string) {
      (this.$root.$refs.loading as any).close();
      (this.$root.$refs.snackbar as any).open(text);
    },
  },
});
</script>