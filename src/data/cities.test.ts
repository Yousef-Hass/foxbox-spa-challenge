import { CITY_IDS } from './cities';

/**
 * Test suite for cities data
 */
describe('Cities Data', () => {
  describe('CITY_IDS', () => {
    test('contains an array of city IDs', () => {
      expect(Array.isArray(CITY_IDS)).toBe(true);
    });

    test('contains only numbers', () => {
      CITY_IDS.forEach(id => {
        expect(typeof id).toBe('number');
        expect(Number.isInteger(id)).toBe(true);
      });
    });

    test('contains positive numbers', () => {
      CITY_IDS.forEach(id => {
        expect(id).toBeGreaterThan(0);
      });
    });

    test('has reasonable number of cities', () => {
      // Should have at least 5 cities but not too many
      expect(CITY_IDS.length).toBeGreaterThanOrEqual(5);
      expect(CITY_IDS.length).toBeLessThanOrEqual(50);
    });

    test('contains no duplicate IDs', () => {
      const uniqueIds = new Set(CITY_IDS);
      expect(uniqueIds.size).toBe(CITY_IDS.length);
    });

    test('contains popular city IDs', () => {
      // These are common OpenWeatherMap city IDs for popular cities
      const expectedCities = [
        2643743, // London
        5128581, // New York
        1850147, // Tokyo
        1796236, // Shanghai
        524901, // Moscow
        1273294, // Delhi
        1174872, // Karachi
        1275339, // Mumbai
        1796236, // Shanghai
        1816670, // Beijing
      ];

      // Check if at least some of the expected cities are present
      const foundCities = expectedCities.filter(id => CITY_IDS.includes(id));
      expect(foundCities.length).toBeGreaterThan(0);
    });
  });
});
