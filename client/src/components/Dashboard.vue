<template>
  <v-layout row wrap>
    <v-flex>
      <h1>Dashboard</h1>
      <router-link :to="{ name: 'blog-new' }">New Blog</router-link>
      <router-link :to="{ name: 'blogs' }">My Blogs</router-link>
      <router-view />
    </v-flex>
  </v-layout>
</template>
