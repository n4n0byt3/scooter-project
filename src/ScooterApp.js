const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  //constructor(stations, retisteredUsers) <--- correct params 
  constructor(registeredUsers) {
    this.stations = {
      wolverhampton: [],
      leicester: [],
      manchester: []
    }
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
    this.registeredUsers[username] = password;
    console.log("user has been added")
  }
  loginUser(username, password) {
    let bool = false;
    for (let i = 0; i < Object.keys(this.registeredUsers).length; i++) {
      if ((username in this.registeredUsers && this.registeredUsers[username].password == password)) {
      console.log("user has been logged in")
      bool = true
      this.registeredUsers[username].loggedIn = true;
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
      if (username in this.registeredUsers) {
        console.log("user has been logged out");
        bool = true
        this.registeredUsers[username].loggedIn = false
        break;
      } 
      
    }
    if (!bool) {
      console.log("no such user was logged in")
    }
  }
  
  createScooter(station) {
    let newScooter = new Scooter (station, null, 1, 1, 100, false)
    if (station in this.stations) {
    this.stations[station].push(newScooter);
    console.log("created new scooter");
    return newScooter
    } else {
      throw new Error ("no such station");
    }
  }
  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    if (scooter.station === station) {
      throw new Error("scooter already at station");
    }
    this.stations[station].push(scooter);
    scooter.station = station;
    scooter.dock();
    console.log(`Scooter is docked at ${station}`);
  }

  rentScooter(scooter, user) {
    if(scooter.station in this.stations) {
      scooter.user = user;
      scooter.station = null;
      console.log("scooter is rented");
    } else {
      console.log("scooter already rented")
    }
  }

  print(){
    let keys = Object.keys(this.registeredUsers)
    let stationKeys = Object.keys(this.stations)
    console.log("--------------------------------------------------")
    console.log("Current Registered Users:")
    console.log(keys)
    console.log("--------------------------------------------------")
    console.log("Current Docked Scooters:")

    for (let i=0; i<stationKeys.length; i++){
      let scooterCount = this.stations[stationKeys[i]].length;
      if(this.stations[stationKeys[i]][0].station == null)
      {
        scooterCount--;
      }
      console.log(stationKeys[i] + " : " + scooterCount)
    }
    console.log("--------------------------------------------------")
  }

}//last curly bracket for class



// userObj = {

// }

// const test = new ScooterApp(userObj)
// test.createScooter("wolverhampton")
// test.createScooter("manchester")
// test.createScooter("leicester")
// test.print()
// test.registerUser("name","pass", 19)
// test.registerUser("name2","pass", 19)
// test.registerUser("name3","pass", 19)
// test.registerUser("name4","pass", 19)
// test.registerUser("name5","pass", 19)
// console.log(Object.keys(test.registeredUsers))
// const scooter = new Scooter("wolverhampton", null, 100, false)
// const user1 = new User ("name", "pass", 19)
// userObj[user1.username] = user1
// test.rentScooter(scooter, "name")
// console.log(scooter.user)
// const test = new ScooterApp ({})
// test.dockScooter(new Scooter ("leicester", null, 1, 1, 50, false), "manchester")
// console.log(this.stations)
// console.log(stationsObj.city)
//  const test = new ScooterApp (user1)
//  console.log(test.registerUser("name3", "password"))
//  console.log((Object.keys(user1))[0]
// console.log(test.logOutUser("name", "pass"))
// const user2 = new User ("name2", "password", 19)
// userObj[user2.username] = user2
// const user1 = new User ("name3", "password", 19)
// const test = new ScooterApp (userObj)
// test.loginUser("name3", "password")
// console.log((userObj.name3.loggedIn))
// test.logOutUser("name3")
// console.log(userObj.name3.loggedIn)
module.exports = ScooterApp
