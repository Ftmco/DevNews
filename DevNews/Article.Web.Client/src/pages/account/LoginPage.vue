<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12" md="7" sm="7">
        <v-card>
          <v-img
            src="@/assets/images/login.png"
            lazy-src="@/assets/images/login.png"
            width="100%"
            height="500px"
            contain
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="5" sm="5">
        <v-card width="100%" height="500px">
          <v-col>
            <v-card-title align="center">Welcome To Article News</v-card-title>
            <v-card-subtitle align="center">Login</v-card-subtitle>
            <v-divider></v-divider>
            <br />
            <v-form ref="loginForm">
              <v-text-field
                v-model="login.userName"
                :rules="[rules.require]"
                outlined
                clearable
                color="blue darken-2"
                label="UserName"
                required
              ></v-text-field>

              <v-text-field
                v-model="login.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="[rules.require, rules.password]"
                outlined
                clearable
                label="Password"
                hint="At least 6 characters"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-form>
            <div>
              <v-btn color="primary" block @click="loginSubmit">
                <span>Login</span>
              </v-btn>
              <br />
              <v-row>
                <v-col>
                  <v-btn color="info" block :to="{ name: 'ForgotPassword' }">
                    <span>Forgot Password</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="info" block :to="{ name: 'SignUp' }">
                    <span>Sign Up</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="info" block :to="{ name: 'ActiveAccount' }">
                    <span>Active Account</span>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { apiCall } from "@/api";
import AccountServiec from "@/api/service/account.service";
import { rules } from "@/constants";
import { showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    rules: rules,
    login: {
      userName: "",
      password: "",
    },
    show: false,
    accountService: new AccountServiec(apiCall),
  }),
  methods: {
    loginSubmit() {
      this.accountService
        .Login(this.login)
        .then((res) => {
          if (res.status) window.location = window.location;
          showMessage(this, res.title);
        })
        .catch((e) => {
          showMessage(this, e.message);
        });
    },
  },
});
</script>