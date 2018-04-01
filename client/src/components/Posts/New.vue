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
                  label="Title"
                  name="title"
                  data-vv-as="title"
                  v-model.trim="title"
                  :error-messages="errors.collect('title')"
                  v-validate="'required'" />
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  multi-line
                  rows="3"
                  label="Body"
                  name="body"
                  data-vv-as="body"
                  v-model.trim="body"
                  :error-messages="errors.collect('body')"
                  v-validate="'required'" />
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
  name: 'PostNew',

  $_veeValidate: {
    validator: 'new'
  },

  data () {
    return {
      title: '',
      body: ''
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
          blogId: parseInt(this.$route.params.id),
          title: this.title,
          body: this.body
        }

        this.$store.dispatch('createPost', data)
          .then(() => {
            this.$router.push({ name: 'posts', params: { id: data.blogId } })
          })
      }
    },

    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
