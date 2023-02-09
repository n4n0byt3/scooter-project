const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  //constructor(stations, retisteredUsers) <--- correct params 
  constructor( registeredUsers) {
    //this.stations = stations
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
  loginUser(username, password) {
    let bool = false;
    for (let i = 0; i < Object.keys(this.registeredUsers).length; i++) {
      if (username == (Object.keys(this.registeredUsers)[i]) && password == (Object.values(this.registeredUsers)[i])) {
      console.log("user has been logged in")
      bool = true
      break;
    } 
    }
    if (!bool) {
      console.log("incorrect username or password")
    }
  }
  
  logOutUser (username) {
    let bool = false
    for (let i = 0; i < Object.keys(this.registeredUsers).length; i++) {
      if (username == (Object.keys(this.registeredUsers)[i])) {
        console.log("user has been logged out");
        bool = true
        break;
      } 
      
    }
    if (!bool) {
      console.log("no such user was logged in")
    }
  }

}//last curly bracket for class
// user1 = {
//   name: "pass",
//   name2: "word"
// }
//  const test = new ScooterApp (user1)
//  console.log(test.registerUser("name2"))
//  console.log(Object.keys(test.registeredUsers))
//  console.log((Object.keys(user1))[0])
// const test = new ScooterApp (user1)
// console.log(test.logOutUser("name", "pass"))
module.exports = ScooterApp
