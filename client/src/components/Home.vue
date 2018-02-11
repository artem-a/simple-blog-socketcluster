<template>
  <v-layout row wrap>
    <v-flex>
      {{ msg }}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
