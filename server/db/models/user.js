const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Company = db.Company;

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  communication_score: {
    type: Sequelize.FLOAT
  },
  communication_percentile: {
    type: Sequelize.FLOAT
  },
  coding_score: {
    type: Sequelize.FLOAT
  },
  coding_percentile: {
    type: Sequelize.FLOAT
  },
  title: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'createdAt',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updatedAt',
    defaultValue: Sequelize.NOW
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

/*const updatePercentiles = user => {
  if (user.changed('communication_score') || user.changed('coding_score')) {
    let company;
    db.Company.findById(user.companyId).then(res => {
      company = res;
    }).then(() => {
      return User.findAll({ where:
        {
          title: user.title,        
        },
        include: [{all: true}], 
      });
    })
    .then(users => {
      return users.filter(ur => {
        return Math.abs(company.fractal_index - ur.company.fractal_index) < 0.15;
      });
    }).then(users => {
      users.forEach(usr => {
        usr.update({
          communication_score: 8,
          coding_score: 8
        })
      })
    })
  }
}

User.beforeCreate(updatePercentiles)*/
//User.beforeUpdate(updatePercentiles)


