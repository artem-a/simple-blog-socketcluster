<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          class="menu-item"
          exact>
          Home
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-for="(item, key) in menuItems" :key="key">
        <router-link
          :to="item.link"
          tag="span"
          class="menu-item"
          exact>
          {{ item.title }}
        </router-link>
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
  name: 'App',

  computed: {
    menuItems () {
      return [
        { link: '/sign-up', title: 'SignUp' }
      ]
    }
  }
}
</script>

<style lang="stylus">
  @import "stylus/main"

  .menu-item
    cursor pointer
</style>
