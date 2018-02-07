const _ = require('lodash')
const faker = require('faker')

module.exports = _.times(10, () => {
  return {
    email: faker.internet.email().toLowerCase(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'qwerty'
  }
})
