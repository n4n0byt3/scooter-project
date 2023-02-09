const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(stations, registeredUsers) {
    this.stations = stations
    this.registeredUsers = registeredUsers
  }

  registerUser(username, password, age) {
    for (let i = 0; i < Object.keys(this.registeredUsers).length; i++) {
      if (Object.keys(this.registeredUsers)[i] == username) {
        return console.log("already registered");
      }
    }
    if (age < 18) {
      return console.log("too young to register");
    }
    this.registeredUsers[username] = "";
    console.log("user has been added")
  }
  
 

}
// user1 = {
//   name: "pass",
//   name2: "word"
// }
//  const test = new ScooterApp (user1)
//  console.log(test.registerUser("name2"))
//  console.log(Object.keys(test.registeredUsers))
//  console.log((Object.keys(user1))[0])
module.exports = ScooterApp
