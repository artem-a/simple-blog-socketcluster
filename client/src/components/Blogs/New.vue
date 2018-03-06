<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 offset-sm4 mb-2 v-if="error">
      <app-alert @dismissed="onDismissed"
        :text="error.message"/>
    </v-flex>

    <v-flex xs12 sm4 offset-sm4>
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
                </v-flex>
              </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BlogsNew',

  $_veeValidate: {
    validator: 'new'
  },

  data () {
    return {
      name: '',
      slug: '',
      description: ''
    }
  },

  computed: {
    ...mapGetters(['loading', 'error'])
  },

  methods: {
    async onSubmit () {
      const isValid = await this.$validator.validateAll()

      if (isValid) {
        const data = {
          name: this.name,
          slug: this.slug,
          description: this.description
        }

        this.$store.dispatch('createBlog', data)
          .then(err => {
            if (!err) {
              this.$router.push('/dashboard/blogs')
            }
          })
      }
    },

    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
