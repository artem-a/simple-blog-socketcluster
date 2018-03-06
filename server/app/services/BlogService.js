'use strict'

const { isEmpty } = require('lodash')

const { Blog } = require('../models')

module.exports = {
  async list (_data, { authToken }) {
    const blogs = await Blog.findByUserId(authToken.id)

    return blogs
  },

  async create (data, { authToken }) {
    const blog = await Blog.create({
      ...data,
      userId: authToken.id
    })

    return blog
  },

  async update (data, { authToken }) {
    const blog = await Blog.findOne({
      where: { id: data.id, userId: authToken.id }
    })

    if (isEmpty(blog)) {
      throw new Error('Blog not found')
    }

    await blog.update(data)

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
