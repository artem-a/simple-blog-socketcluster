<template>
  <div>
    My Blogs
    <div v-for="blog in blogs" :key="blog.id">
      {{ blog.name }}
      |
      {{ blog.description }}
      |
<!--       <v-btn
        small
        color="info"
        :to="`/dashboard/blogs/${blog.id}/edit`">
        Edit
      </v-btn> -->
      <blog-edit :blog="blog" />
      <v-btn
        small
        color="warning"
        @click="deleteBlog(blog.id)">
        Delete
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Edit from './Edit'

export default {
  name: 'BlogsList',

  components: {
    'blog-edit': Edit
  },

  computed: {
    ...mapGetters(['loading', 'errors', 'blogs'])
  },

  created () {
    this.$store.dispatch('getBlogs')
  },

  methods: {
    deleteBlog (id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteBlog', id)
      }
    }
  }
}
</script>
