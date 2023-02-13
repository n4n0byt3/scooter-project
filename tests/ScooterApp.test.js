const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

describe('ScooterApp', () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
  });

  describe('registerUser', () => {
    let scooterApp;
  
    beforeEach(() => {
      scooterApp = new ScooterApp();
    });
  
    it('should register a new user', () => {
      const username = 'john_doe';
      const password = 'password';
      const age = 20;
  
      const registeredUser = scooterApp.registerUser(username, password, age);
      expect(registeredUser).toBeInstanceOf(User);
      expect(registeredUser.username).toBe(username);
      expect(registeredUser.password).toBe(password);
      expect(registeredUser.age).toBe(age);
    });
  
    it('should throw an error if the user is already registered', () => {
      const username = 'john_doe';
      const password = 'password';
      const age = 20;
  
      scooterApp.registerUser(username, password, age);
      expect(() => {
        scooterApp.registerUser(username, password, age);
      }).toThrowError('User already registered');
    });
  
    it('should throw an error if the user is too young to register', () => {
      const username = 'john_doe';
      const password = 'password';
      const age = 17;
  
      expect(() => {
        scooterApp.registerUser(username, password, age);
      }).toThrowError('Too young to register');
    });

    it('throws an error if the user is already registered', () => {
      app.registerUser('user1', 'password', 20);
      expect(() => {
        app.registerUser('user1', 'password', 20);
      }).toThrowError('already registered or too young to register');
    });

    it('throws an error if the user is too young', () => {
      expect(() => {
        app.registerUser('user1', 'password', 17);
      }).toThrowError('already registered or too young to register');
    });
  });
  describe("loginUser", () => {
    let scooterApp;
  
    beforeEach(() => {
      scooterApp = new ScooterApp();
      scooterApp.registerUser("user1", "password1", 20);
    });
  
    test("logs in a registered user successfully", () => {
      const spy = jest.spyOn(console, "log");
      scooterApp.loginUser("user1", "password1");
      expect(spy).toHaveBeenCalledWith("User user1 has been logged in.");
    });
  
    test("throws an error if the user cannot be located", () => {
      expect(() => {
        scooterApp.loginUser("user2", "password2");
      }).toThrowError("Username or password is incorrect.");
    });
  
    test("throws an error if the password is incorrect", () => {
      expect(() => {
        scooterApp.loginUser("user1", "password2");
      }).toThrowError("Username or password is incorrect.");
    });
  });
  const scooterApp = new ScooterApp();
const user = scooterApp.registerUser('user1', 'password1', 18);

test('user can log out', () => {
  scooterApp.loginUser('user1', 'password1');
  scooterApp.logoutUser('user1');
  expect(user.isLoggedIn).toBe(false);
});

test('user cannot log out if not logged in', () => {
  expect(() => {
    scooterApp.logoutUser('user1');
  }).toThrowError('No such user is logged in');
});

test('user cannot log out if not registered', () => {
  expect(() => {
    scooterApp.logoutUser('user2');
  }).toThrowError('No such user is logged in');
});

test('creates a new scooter and adds it to the station', () => {
    scooterApp.stations.push(new Station('station 1'));
    const scooter = scooterApp.createScooter('station 1');
    expect(scooter).toBeDefined();
    expect(scooter.id).toBe(1);
    expect(scooter.station.name).toBe('station 1');
    expect(scooterApp.scooters.length).toBe(1);
    expect(scooterApp.stations[0].scooters.length).toBe(1);
});

test('throws an error if the station does not exist', () => {
    expect(() => scooterApp.createScooter('station 2')).toThrow('No such station');
});

test("Dock scooter to station successfully", () => {
  let station = { name: "Station 1", scooters: [] };
  scooterApp.stations.push(station);

  let scooter = { id: "SC001", station: null };
  scooterApp.dockScooter(scooter, "Station 1");

  expect(scooter.station).toEqual(station);
  expect(station.scooters).toContain(scooter);
});

test("Throw error when station does not exist", () => {
  let scooter = { id: "SC002", station: null };

  expect(() => {
    scooterApp.dockScooter(scooter, "Station 2");
  }).toThrow("No such station error");
});

test("Throw error when scooter is already at station", () => {
  let station = { name: "Station 1", scooters: [] };
  scooterApp.stations.push(station);

  let scooter = { id: "SC003", station: null };
  scooterApp.stations[0].scooters.push(scooter);
  scooter.station = scooterApp.stations[0];

  expect(() => {
    scooterApp.dockScooter(scooter, "Station 1");
  }).toThrow("Scooter already at station error");
});
describe('rentScooter', () => {
  let app;
  let user;
  let scooter;

  beforeEach(() => {
    app = new ScooterApp();
    user = app.registerUser('john', 'pass123', 20);
    scooter = new Scooter(1);
    app.stations = {
      wolverhampton: [scooter],
      leicester: [],
      manchester: []
    };
  });

  it('should rent the scooter to the user', () => {
    app.rentScooter(scooter, user);
    expect(scooter.user).toBe(user);
    expect(app.stations.wolverhampton.length).toBe(0);
    expect(app.users.length).toBe(1);
    expect(app.users[0]).toBe(user);
  });

  it('should throw an error if the scooter is already rented', () => {
    scooter.user = user;
    expect(() => app.rentScooter(scooter, user)).toThrow('Scooter already rented');
  });

  it('should throw an error if the scooter is not found', () => {
    const fakeScooter = new Scooter(2);
    expect(() => app.rentScooter(fakeScooter, user)).toThrow('No such scooter found');
  });
});
describe("ScooterApp.print", () => {
  let scooterApp;

  beforeEach(() => {
    scooterApp = new ScooterApp();
  });

  test("Prints a list of registered users", () => {
    scooterApp.registeredUsers = {
      "user1": new User("user1", "pass1", 18),
      "user2": new User("user2", "pass2", 18)
    };

    scooterApp.stations = [      new Station("wolverhampton", []),
      new Station("leicester", [])
    ];

    const logSpy = jest.spyOn(console, "log");

    scooterApp.print();

    expect(logSpy).toHaveBeenCalledWith("Registered Users:");
    expect(logSpy).toHaveBeenCalledWith("1. user1");
    expect(logSpy).toHaveBeenCalledWith("2. user2");
  });

  test("Prints a list of stations with scooters count", () => {
    scooterApp.registeredUsers = {};
    scooterApp.stations = [      new Station("wolverhampton", [new Scooter(1), new Scooter(2)]),
      new Station("leicester", [new Scooter(3), new Scooter(4)])
    ];

    const logSpy = jest.spyOn(console, "log");

    scooterApp.print();

    expect(logSpy).toHaveBeenCalledWith("\nStations:");
    expect(logSpy).toHaveBeenCalledWith("1. wolverhampton (2 scooters)");
    expect(logSpy).toHaveBeenCalledWith("2. leicester (2 scooters)");
  });
});
});