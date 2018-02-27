'use strict'

const { isEmpty } = require('lodash')

const { Blog } = require('../models')

module.exports = {
  async list (_data, socket) {
    const blogs = await Blog.findByUserId(socket.authToken.id)

    return blogs
  },

  async create (data, socket) {
    const blog = await Blog.create({
      ...data,
      userId: socket.authToken.id
    })

    return blog
  },

  async delete ({ id }, { authToken }) {
    const blog = await Blog.findOne({ where: { id, userId: authToken.id } })

    if (isEmpty(blog)) {
      throw new Error('Blog not found')
    }

    await blog.destroy()
  }
}
