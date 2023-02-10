const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

const ScooterApp = require('./ScooterApp');

describe('ScooterApp', () => {
  describe('stations property', () => {
    let app;

    beforeEach(() => {
      app = new ScooterApp();
    });

    it('should be an object', () => {
      expect(typeof app.stations).toBe('object');
    });

    it('should have at least 3 keys', () => {
      expect(Object.keys(app.stations).length).toBeGreaterThanOrEqual(3);
    });

    it('should have values that are arrays', () => {
      Object.values(app.stations).forEach(value => {
        expect(Array.isArray(value)).toBe(true);
      });
    });

    it('should have empty arrays as values initially', () => {
      Object.values(app.stations).forEach(value => {
        expect(value.length).toBe(0);
      });
    });
  });
});