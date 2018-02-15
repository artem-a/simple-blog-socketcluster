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
      <v-toolbar-title>
        <a class="white--text" @click.prevent="signOut" v-if="isLoggedIn">
          Sign Out
        </a>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer app>
      <v-spacer></v-spacer>
      <div>&copy; 2018</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapGetters(['isLoggedIn']),

    menuItems () {
      if (this.isLoggedIn) {
        return []
      }

      return [
        { link: 'sign-up', title: 'Sign Up' },
        { link: 'sign-in', title: 'Sign In' }
      ]
    }
  },

  created () {
    const authToken = localStorage.getItem('socketCluster.authToken')
    if (authToken) {
      this.$store.dispatch('autoSignIn', authToken)
    }
  },

  methods: {
    signOut () {
      this.$store.dispatch('signOut')
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>

<style lang="stylus">
  @import "stylus/main"

  .menu-item
    cursor pointer
</style>
