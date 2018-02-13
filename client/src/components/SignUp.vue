<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 offset-sm4 mb-2 v-if="error">
      <app-alert @dismissed="onDismissed"
        :text="error.message"/>
    </v-flex>

    <v-flex xs12 sm4 offset-sm4>
      <v-card>
        <v-card-text>
          <v-container>
            <v-form @submit.prevent="onSubmit">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="First name"
                    name="firstName"
                    data-vv-as="first name"
                    v-model.trim="firstName"
                    :error-messages="errors.collect('firstName')"
                    v-validate="'required'"
                    required />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Last name"
                    name="lastName"
                    data-vv-as="lats name"
                    v-model.trim="lastName"
                    :error-messages="errors.collect('lastName')"
                    v-validate="'required'"
                    required />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    label="Email"
                    type="email"
                    name="email"
                    v-model.trim="email"
                    :error-messages="errors.collect('email')"
                    v-validate="'required|email'"
                    required />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    v-model.trim="password"
                    :error-messages="errors.collect('password')"
                    v-validate="'required|min:6'"
                    required />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    :disabled="loading">
                    Sign Up
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import isEmpty from 'lodash.isempty'
import { mapGetters } from 'vuex'

export default {
  name: 'SignUp',

  $_veeValidate: {
    validator: 'new'
  },

  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('signUp', data)
          .then(() => {
            if (isEmpty(this.error)) {
              this.$router.push({ name: 'signin' })
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

<style lang="stylus" scoped>
  button[type="submit"]
    float right
</style>
