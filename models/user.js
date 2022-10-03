'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.hasMany(models.journal)
      models.user.hasMany(models.note)
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
       len: {
        args: [1,99],
        msg: 'Name must be between 1 and 99 characters'
       }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  //line 50-56 will run function once when user is creating accouunt
// Before a user is created, we are encrypting the password and using hash in its place
user.addHook('beforeCreate', (pendingUser) => { // pendingUser is user object that gets passed to DB
  // Bcrypt is going to hash the password
  let hash = bcrypt.hashSync(pendingUser.password, 12); // hash 12 times,when password is inputted it, it will be hashed 12 times,
  //to prevent hacking account and will return a string of characters
  pendingUser.password = hash; // this will go to the DB
});  

// Check the password on Sign-In and compare it to the hashed password in the DB
user.prototype.validPassword = function(typedPassword) {
  let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password); // check to see if password is correct.

  return isCorrectPassword;
}
// return an object from the database of the user without the encrypted password
user.prototype.toJSON = function() {
  let userData = this.get(); 
  delete userData.password; // it doesn't delete password from database, only removes it to the view user
  
  return userData;
}
  return user; // add functions above 
};