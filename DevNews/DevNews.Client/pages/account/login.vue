<template>
  <AccountBase title="Login" subTitle="Welcome To Dev News" formHeight="500px">
    <template v-slot:image>
      <v-img
        contain
        src="/images/login.png"
        lazy-src="/images/login.png"
        width="100%"
        height="500px"
      />
    </template>
    <template v-slot:form>
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
    </template>
    <template v-slot:actions>
      <div>
        <v-btn color="primary" block @click="loginSubmit">
          <span>Login</span>
        </v-btn>
        <br />
        <v-row>
          <v-col>
            <v-btn color="info" block>
              <span>Forgot Password</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="info" block>
              <span>Sign Up</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="info" block>
              <span>Active Account</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
  </AccountBase>
</template>

<script lang="ts">
import Vue from "vue";
import { messages, rules } from "@/constants";
import AccountBase from "@/components/account/AccountBase.vue";
import account from "@/api/apiList/account";
export default Vue.extend({
  name: "Login",
  components: {
    AccountBase,
  },
  head: () => ({
    title: "Login",
  }),
  data: () => ({
    login: {
      userName: "",
      password: "",
    },
    show: false,
    rules: rules,
  }),
  mounted() {
    if (window != undefined) {
      if (localStorage.getItem("Token")) {
        this.$router.push("/account/profile");
      }
    }
  },
  methods: {
    loginSubmit() {
      (this.$root.$refs.loading as any).open();
      account
        .login(this.login)
        .then((res) => {
          if (res.status) {
            let session = res.result;
            localStorage.setItem(session.key, session.value);
            this.$store.commit("setAuth");
            this.$router.push("/account/profile");
          }
          this.showMessage(res.title);
        })
        .catch((e) => {
          this.showMessage(messages.netWorkError(e.message).title);
        });
    },
    showMessage(text: string) {
      (this.$root.$refs.snackbar as any).open(text);
      (this.$root.$refs.loading as any).close();
    },
  },
});
</script>