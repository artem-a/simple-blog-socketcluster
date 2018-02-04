<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-spacer></v-spacer>
      <v-toolbar-title>
        Sign In
      </v-toolbar-title>
      <v-toolbar-title>
        Sign Up
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer app>
      <v-spacer></v-spacer>
      <div>&copy; 2018</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
  @import "stylus/main"
</style>
