<template>
    <AccountBase title="Active Account"
                 subTitle="Active Account Article News"
                 formHeight="500px">

        <template v-slot:image>
            <v-img contain
                   src="@/assets/images/reset-password.png"
                   lazy-src="@/assets/images/reset-password.png"
                   width="100%"
                   height="500px" />
        </template>

        <template v-slot:form>
            <v-form ref="activeForm">
                <v-text-field v-model="activeModel.userName"
                              :rules="[rules.require]"
                              outlined
                              clearable
                              color="blue darken-2"
                              label="User Name"
                              required></v-text-field>
                <v-text-field v-model="activeModel.activeCode"
                              :rules="[rules.require]"
                              outlined
                              clearable
                              color="blue darken-2"
                              label="Active Code"
                              required></v-text-field>
            </v-form>
        </template>

        <template v-slot:actions>
            <div>
                <v-btn color="primary" block @click="activeAccount">
                    <span>Active Account</span>
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
                        <v-btn color="info" block :to="{ name: 'Login' }">
                            <span>Login</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </template>
    </AccountBase>
</template>

<script lang="ts">
    import Vue from "vue";
    import AccountBase from "@/components/account/AccountBase.vue";
    import { messages, rules } from "@/constants";
    import AccountServiec from "../../api/service/account.service";
    import { apiCall } from "../../api";
    import { message } from "ant-design-vue";
    export default Vue.extend({
        data: () => ({
            activeModel: {
                userName: "",
                activeCode: "",
            },
            rules: rules,
            accountService: new AccountServiec(apiCall)
        }),
        mounted() {
            this.activeModel.userName = this.$route.query.userName.toString();
        },
        components: {
            AccountBase,
        },
        methods: {
            activeAccount() {
                (this.$root.$refs.loading as any).open();
                this.accountService.Acivation(this.activeModel)
                    .then((res) => {
                        if (res.status)
                            this.$router.push({ name: 'Login' })
                        this.showMessage(res.title)
                    }).catch((e) => {
                        this.showMessage(messages.netWorkError(e.message).title)
                    })
            },
            showMessage(text: string) {
                (this.$root.$refs.snackbar as any).open(text);
                (this.$root.$refs.loading as any).close();
            }
        }
    });
</script>