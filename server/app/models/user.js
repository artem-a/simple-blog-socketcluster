'use strict'

const bcrypt = require('bcrypt')

const cryptedPassword = instance => {
  if (instance.changed('password')) {
    return bcrypt.hash(instance.password, 10)
      .then(hash => (instance.cryptedPassword = hash))
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,

    firstName: {
      field: 'first_name',
      type: DataTypes.STRING
    },

    lastName: {
      field: 'last_name',
      type: DataTypes.STRING
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
    timestamps: true,

    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })

  // Hooks
  User.beforeCreate(cryptedPassword)

  return User
}
