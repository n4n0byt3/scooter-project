const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  //constructor(stations, retisteredUsers) <--- correct params 
  constructor() {
    this.stations = {
      wolverhampton: [],
      leicester: [],
      manchester: []
    }
    this.registeredUsers = {

    }
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error('User already registered');
    } else if (age < 18) {
      throw new Error('Too young to register');
    } else {
      const user = new User(username, password, age);
      this.registeredUsers[username] = user;
      console.log(`User ${username} has been registered`);
      return user;
    }
  }

    
loginUser(username, password) {
  let user = this.registeredUsers[username];
  if (!user) {
    throw new Error("Username or password is incorrect");
  }
  if (user.password !== password) {
    throw new Error("Username or password is incorrect");
  }
  user.login();
  console.log(`${username} has been logged in`);
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
  createScooter(stationName) {
    const station = this.stations.find(s => s.name === stationName);
    if (!station) {
        throw new Error('No such station');
    }

    const scooter = new Scooter(this.scooters.length + 1);
    scooter.station = station;
    station.scooters.push(scooter);
    this.scooters.push(scooter);
    console.log(`Created new scooter ${scooter.id}`);

    return scooter;
}
dockScooter(scooter, station) {
  let stationExists = this.stations.some(st => st.name === station);
  if (!stationExists) {
    throw new Error("No such station error");
  }

  let scooterExists = this.stations.find(st => st.name === station).scooters.some(s => s.id === scooter.id);
  if (scooterExists) {
    throw new Error("Scooter already at station error");
  }

  let targetStation = this.stations.find(st => st.name === station);
  targetStation.scooters.push(scooter);
  scooter.station = targetStation;
  console.log(`Scooter is docked at ${targetStation.name} station`);
}
rentScooter(scooter, user) {
  const station = this.stations.find(s => s.scooters.includes(scooter));
  if (!station) {
      throw new Error("No such scooter found");
  }
  if (scooter.user) {
      throw new Error("Scooter already rented");
  }
  station.scooters = station.scooters.filter(s => s !== scooter);
  scooter.user = user;
  scooter.station = null;
  this.users.push(user);
  console.log(`Scooter is rented: ${scooter.id}`);
}
print() {
  console.log("Registered Users:");
  for (let i = 0; i < users.length; i++) {
    console.log(`${i + 1}. ${users[i].name}`);
  }

  console.log("\nStations:");
  for (let i = 0; i < stations.length; i++) {
    console.log(`${i + 1}. ${stations[i].name} (${stations[i].scooters.length} scooters)`);
  }
}
  

};//last curly bracket for class



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
