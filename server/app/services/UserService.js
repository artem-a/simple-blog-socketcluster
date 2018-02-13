'use strict'

const { User } = require('../models')

module.exports = {
  async create (data, socket) {
    await User.create(data)
  }
}
