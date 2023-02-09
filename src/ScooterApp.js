const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(stations, registeredUsers) {
    this.stations = stations
    this.registeredUsers = registeredUsers
  }
  registerUser = function(username, password, age) {
    for (var i = 0; i < registeredUsers.length; i++) {
      if (this.user[i].username === username) {
        return console.log('Already registered');
      }
    }
  
    if (age < 18) {
      return console.log('Too young to register');
    }
  
    this.users.push({
      username: username,
      password: password,
      age: age
    });
  
    console.log('User ' + username + ' has been registered');
  };

}

module.exports = ScooterApp
