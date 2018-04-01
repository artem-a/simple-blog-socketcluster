'use strict'

const { isEmpty } = require('lodash')

const { User } = require('../models')

module.exports = {
  async local (data, socket) {
    if (isEmpty(data.email.trim()) || isEmpty(data.password)) {
      throw new Error('Invalid credentials')
    }

    const user = await User.authenticate(data)

    if (isEmpty(user)) {
      throw new Error('Invalid credentials')
    }

    socket.setAuthToken(user.toJSON())

    return user
  }
}
