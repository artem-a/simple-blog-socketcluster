'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    blogId: {
      field: 'blog_id',
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    body: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    },
    isDraft: {
      field: 'is_draft',
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    allowComments: {
      field: 'allow_comments',
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    commentsCount: {
      field: 'comments_count',
      defaultValue: 0,
      type: DataTypes.BIGINT
    }
  }, {
    tableName: 'posts',
    underscored: true
  })

  // Associations
  Post.associate = function (models) {
    models.Post.belongsTo(models.Blog, { foreignKey: 'id' })
    models.Post.belongsTo(models.User, { foreignKey: 'id' })
  }

  // Class methods
  Post.findByBlogId = function (blogId) {
    return this.findAll({ where: { blogId } })
  }

  return Post
}
