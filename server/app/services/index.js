'use strict'

const UserService = require('./UserService')

module.exports = {
  UserService,

  exec (command, args) {
    const [serviceName, method] = command.split('@')
    const service = this[serviceName]

    if (!service) {
      throw new Error(`Service ${serviceName} not found`)
    }

    return service[method].apply(service, args)
  }
}
