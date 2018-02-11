'use strict'

const models = require('../../app/models')
const fixtures = require('../fixtures/users')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const userPromises = fixtures.map(data => models.User.create(data))
    return Promise.all(userPromises)
  },

  down: (queryInterface, Sequelize) => {
    return models.User.destroy({ force: true })
  }
}
