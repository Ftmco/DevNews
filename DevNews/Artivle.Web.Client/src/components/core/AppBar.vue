<template>
    <div>
        <v-app-bar app
                   color="primary"
                   dark>
            <div class="d-flex align-center">
                <v-app-bar-nav-icon @click="drawer"></v-app-bar-nav-icon>
                <v-btn icon @click="changeTheme">
                    <v-icon>mdi-theme-light-dark</v-icon>
                </v-btn>
                <v-card-title>{{title}}</v-card-title>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>
        <TheNavigation />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import TheNavigation from "./TheNavigation.vue"

    export default Vue.extend({
        name: "AppBar",
        data: () => ({
            title: 'Home'
        }),
        components: {
            TheNavigation
        },
        mounted() {
            this.setData()
        },
        watch: {
            $route() {
                this.setData()
            }
        },
        methods: {
            drawer() {
                this.$root.$refs.navigationDrawer.open();
            },
            setData() {
                this.title = this.$route.meta(this.$route).title
            },
            changeTheme() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            }
        }
    })
</script>

<style scoped>
</style>