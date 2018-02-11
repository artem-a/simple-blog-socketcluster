'use strict'

const { User } = require('../models')

module.exports = {
  async create (data) {
    return await User.create(data)
  }
}
