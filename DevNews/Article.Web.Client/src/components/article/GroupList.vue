<template>
    <v-list rounded>
        <v-list-item-group color="primary">
          <v-list-item v-for="(group, i) in groups" :key="i">
            <v-list-item-avatar>
              <v-img :src="group.avatar" :lazy-src="group.avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="group.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:{
        groups:[]
    }
})
</script>