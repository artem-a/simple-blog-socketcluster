'use strict'

const { pick } = require('lodash')

const { Post } = require('../models')

module.exports = {
  async list (body, { authToken }) {
    const posts = await Post.findByBlogId(body.blogId)

    return posts
  },

  async create (body, { authToken }) {
    const data = pick(body, ['blogId', 'title', 'body'])

    const post = await Post.create({
      ...data,
      userId: authToken.id
    })

    return post
  }
}
