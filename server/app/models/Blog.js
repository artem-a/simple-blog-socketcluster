'use strict'

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
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
