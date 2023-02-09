class Scooter{
  constructor (station, user, seial, nextSerial, charge, isBroken) {
    this.station = station
    this.user = user
    this.serial = serial
    this.nextSerial = nextSerial
    this.charge = charge
    this.isBroken = isBroken
  }
  rent () {
    if (this.charge > 20 && this.isBroken === false) {
      this.station === null;
    } else {
      this.user === null;
      if (this.charge < 20) {
        throw new Error ("scooter needs to charge")
      } else if (this.isBroken === true) {
        throw new Error ("scooter needs to be repaired")
      }
    }
  }
  dock(station) {
    this.station === station
    this.user === null;
  }

  recharge() {
    console.log('Current charge: ' + this.charge);
  let interval = setInterval(function() {
    this.charge++;
    if (this.charge % 20 === 0) {
      console.log('Charge is now at ' + this.charge);
    }
    if (this.charge === 100) {
      clearInterval(interval);
      console.log("Scooter fully charged");
    }
  }.bind(this), 1000);
}

  requestRepair () {
    console.log(this.isBroken)
    let interval = setInterval(function() {
      this.broken = false;
      console.log("repair completed")
      clearInterval(interval);
    }.bind(this), 5000);
  }
  

}

// const test = new Scooter (true)
// console.log(test.requestRepair())
module.exports = Scooter
