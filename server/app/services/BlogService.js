'use strict'

const { Blog } = require('../models')

module.exports = {
  async create (data, socket) {
    const blog = await Blog.create({
      ...data,
      userId: socket.authToken.id
    })

    return blog
  }
}
