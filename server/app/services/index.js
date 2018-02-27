'use strict'

const AuthService = require('./AuthService')
const UserService = require('./UserService')
const BlogService = require('./BlogService')

module.exports = {
  AuthService,
  UserService,
  BlogService,

  exec (command, args) {
    const [serviceName, method] = command.split('@')
    const service = this[serviceName]

    if (!service) {
      throw new Error(`Service ${serviceName} not found`)
    }

    if (!service[method]) {
      throw new Error(`Method ${method} not found in ${serviceName}`)
    }

    return service[method].apply(service, args)
  }
}
