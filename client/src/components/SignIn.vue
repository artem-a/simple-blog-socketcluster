<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 offset-sm4>
      <v-card>
        <v-card-text>
          <v-container>
            <v-form @submit.prevent="onSubmit">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Email"
                    type="email"
                    v-model.trim="email"
                    v-validate="'required|email'" />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model.trim="password"
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
                    Sing In
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
import { mapGetters } from 'vuex'

export default {
  name: 'SignIn',

  $_veeValidate: {
    validator: 'new'
  },

  data () {
    return {
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
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('signIn', data)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  button[type="submit"]
    float right
</style>
