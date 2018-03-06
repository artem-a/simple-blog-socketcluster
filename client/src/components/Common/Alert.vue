<template>
  <v-alert
    color="error"
    icon="warning"
    dismissible
    @input="onClose"
    :value="true">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    text: { type: String, required: true }
  },

  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
