'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blog_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'blogs',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      is_draft: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      allow_comments: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      comments_count: {
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => Promise.all([
        queryInterface.addIndex('posts', { fields: ['blog_id'] }),
        queryInterface.addIndex('posts', { fields: ['user_id'] })
      ])
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts')
  }
}
