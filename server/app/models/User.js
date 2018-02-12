'use strict'

const bcrypt = require('bcrypt')
const _ = require('lodash')

const encryptPassword = instance => {
  if (instance.changed('password')) {
    return bcrypt.hash(instance.password, 10)
      .then(hash => (instance.cryptedPassword = hash))
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },

    firstName: {
      field: 'first_name',
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    lastName: {
      field: 'last_name',
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    cryptedPassword: {
      field: 'crypted_password',
      type: DataTypes.STRING
    },

    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: [6]
      }
    },

    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },

    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    tableName: 'users',
    timestamps: true

    // classMethods: {
    //   associate (models) {
    //     // associations can be defined here
    //   }
    // }
  })

  // Hooks
  User.beforeCreate(encryptPassword)

  // Class methods
  User.authenticate = async function ({ email, password }) {
    let user = await this.findByEmail(email)

    if (_.isEmpty(user)) {
      user = User.build({ cryptedPassword: 'protect-from-bruteforce' })
    }

    if (await bcrypt.compare(password, user.cryptedPassword)) {
      return user
    }

    return null
  }

  User.findByEmail = function (email) {
    return this.findOne({ where: { email }})
  }

  // Instance methods
  User.prototype.toJSON = function () {
    return _.omit(this.get(), ['cryptedPassword', 'password'])
  }

  return User
}
