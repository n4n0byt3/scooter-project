class Scooter {
  constructor(charge, isBroken) {
    this.charge = charge;
    this.isBroken = isBroken;
    this.user = null;
    this.station = null;
  }

  rent() {
    if (this.charge > 20 && !this.isBroken) {
      this.user = "User";
      this.station = null;
      console.log("Scooter checked out to user.");
    } else if (this.charge <= 20) {
      throw new Error("Scooter needs to charge.");
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair.");
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
    console.log("Scooter returned to station.");
  }

  recharge() {
    let intervalId = setInterval(() => {
      if (this.charge < 100) {
        this.charge += 10;
        console.log(`Scooter charged to ${this.charge}%.`);
      } else {
        clearInterval(intervalId);
        console.log("Scooter fully charged.");
      }
    }, 1000);
  }

  requestRepair() {
    let intervalId = setInterval(() => {
      this.isBroken = false;
      console.log("Repair completed.");
      clearInterval(intervalId);
    }, 5000);
  }
}

describe('Scooter'), () => {
  let scooter;

  beforeEach(() => {
    scooter = new Scooter(50, false);
  });
}

  test('can be rented if charged above 20% and not broken', () => {
    scooter.rent();
    expect(scooter.user).toBe("User");
    expect(scooter.station).toBe(null);
  });

  test('cannot be rented if charged below 20%', () => {
    scooter.charge = 10;
    expect(() => scooter.rent()).toThrowError("Scooter needs to charge.");
  });

  test('cannot be rented if broken', () => {
    scooter.isBroken = true;
    expect(() => scooter.rent()).toThrowError("Scooter needs repair.");
  });

  test('can be returned to a station', () => {
    scooter.rent();
    scooter.dock("Station 1");
    expect(scooter.user).toBe(null);
    expect(scooter.station).toBe("Station 1");
  });

  test('can be recharged'), () => {
    jest.spyOn(console, 'log');
    scooter.recharge();
    expect(console.log.mock.calls[0][0]).toBe("Scooter charged to 60%.");
    expect(console.log.mock.calls[1][0]).toBe("Scooter charged to 70%.");
  }