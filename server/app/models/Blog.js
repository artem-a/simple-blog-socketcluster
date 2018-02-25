'use strict'

const { slugify } = require('transliteration')
const { isEmpty } = require('lodash')

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },

    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    slug: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      set (val) {
        if (isEmpty(val.trim())) {
          val = this.getDataValue('name')
        }

        this.setDataValue('slug', slugify(val))
      }
    },

    description: DataTypes.TEXT,

    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },

    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    tableName: 'blogs',
    timestamps: true
  })

  // Associations
  Blog.associate = function (models) {
    models.Blog.belongsTo(models.User)
  }

  return Blog
}
