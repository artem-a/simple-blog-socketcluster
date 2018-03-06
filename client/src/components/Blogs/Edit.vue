<template>
  <v-dialog max-width="350px" persistent v-model="showDialog">
    <v-btn small color="info" slot="activator">
      Edit
    </v-btn>
      <v-card>
        <v-container>
          <v-form @submit.prevent="onSubmit">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Name"
                    name="name"
                    data-vv-as="name"
                    v-model.trim="name"
                    :error-messages="errors.collect('name')"
                    v-validate="'required'"
                    required />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Slug"
                    name="slug"
                    v-model.trim="slug" />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    multi-line
                    rows="3"
                    label="Description"
                    name="description"
                    v-model.trim="description" />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    :disabled="loading">
                    Save
                  </v-btn>
                  <v-btn
                    color="error"
                    @click.native="onCancel">
                    Cancel
                  </v-btn>
                </v-flex>
              </v-layout>
          </v-form>
        </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
import pick from 'lodash.pick'
import isEmpty from 'lodash.isempty'
import { mapGetters } from 'vuex'

import diffObject from '@/helpers/differenceObject'

export default {
  name: 'BlogEdit',

  props: {
    blog: { type: Object, required: true }
  },

  $_veeValidate: {
    validator: 'new'
  },

  fields: ['name', 'slug', 'description'],

  computed: {
    ...mapGetters(['loading', 'error'])
  },

  data () {
    return {
      showDialog: false,
      name: this.blog.name,
      slug: this.blog.slug,
      description: this.blog.description
    }
  },

  methods: {
    async onSubmit () {
      const isValid = await this.$validator.validateAll()
      if (!isValid) { return }

      const blogData = pick(this.blog, this.$options.fields)
      const currentData = pick(this, this.$options.fields)
      const data = diffObject(currentData, blogData)

      if (isEmpty(data)) { return }

      data.id = this.blog.id

      this.$store.dispatch('updateBlog', data)
        .then(err => {
          if (!err) {
            this.showDialog = false
          }
        })
    },

    onCancel () {
      this.showDialog = false
      this.name = this.blog.name
      this.slug = this.blog.slug
      this.description = this.blog.description
    }
  }
}
</script>
