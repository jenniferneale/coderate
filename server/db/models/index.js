const User = require('./user')
const Company = require('./company')

/**
 * Associations
 */
Company.hasMany(User);
User.belongsTo(Company);

/**
 *Model Exports
 **/
module.exports = {
  User,
  Company
}
