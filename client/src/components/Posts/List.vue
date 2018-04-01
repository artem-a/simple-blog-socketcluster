<template>
  <div>
    <router-link :to="{ name: 'post-new', params: { id: blogId }}">New Post</router-link>
    My posts list
    <div v-for="p in posts" :key="p.id">
      {{ p.title }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Posts',

  computed: {
    ...mapGetters(['loading', 'errors', 'posts']),

    blogId () {
      return this.$route.params.id
    }
  },

  created () {
    this.$store.dispatch('getPosts', { blogId: this.blogId })
  }
}
</script>
