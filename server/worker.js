const SCWorker = require('socketcluster/scworker')
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const morgan = require('morgan')
const healthChecker = require('sc-framework-health-check')
const _ = require('lodash')

const commands = require('./config/commands')
const models = require('./app/models')
const services = require('./app/services')

class Worker extends SCWorker {
  callService (type, args) {
    const command = commands[type]

    if (!command) {
      throw new Error(`Invalid command type: ${type}`)
    }

    return services.exec(command, args)
  }

  run () {
    console.log('   >> Worker PID:', process.pid)
    const environment = this.options.environment

    const app = express()

    const httpServer = this.httpServer
    const scServer = this.scServer

    if (environment === 'dev') {
      // Log every HTTP request. See https://github.com/expressjs/morgan for other
      // available formats.
      app.use(morgan('dev'))
    }

    app.use(serveStatic(path.resolve(__dirname, 'public')))

    // Add GET /health-check express route
    healthChecker.attach(this, app)

    httpServer.on('request', app)

    const {
      MIDDLEWARE_AUTHENTICATE,
      MIDDLEWARE_EMIT
    } = scServer

    scServer.addMiddleware(MIDDLEWARE_AUTHENTICATE, async (req, next) => {
      const { id, email } = req.authToken
      const userExists = await models.User.isExists({ id, email })

      if (userExists) {
        next()
      } else {
        next(new Error('This account no longer exist or has been deleted'))
      }
    })

    scServer.addMiddleware(MIDDLEWARE_EMIT, (req, next) => {
      if (req.authTokenExpiredError) {
        next(req.authTokenExpiredError)
      } else {
        next()
      }
    })

    /*
      In here we handle our incoming realtime connections and listen for events.
    */
    scServer.on('connection', (socket) => {
      socket.on('api', async (data, res) => {
        try {
          const { type, body } = data

          const result = await this.callService(type, [body, socket])

          res(null, result)
        } catch (error) {
          res(_.pick(error, ['name', 'message']))
        }
      })
    })
  }
}

/* eslint-disable no-new */
new Worker()
