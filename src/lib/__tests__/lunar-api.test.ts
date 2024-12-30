import { LunarCalendarConverter } from '../lunar-api';

describe('LunarCalendarConverter', () => {
  describe('lunarToGregorian', () => {
    const testCases = [
      // Regular month conversions
      {
        lunar: { year: 2024, month: 1, day: 1, isLeapMonth: false },
        expected: { year: 2024, month: 2, day: 10 },
        description: 'Chinese New Year 2024'
      },
      {
        lunar: { year: 2024, month: 12, day: 29, isLeapMonth: false },
        expected: { year: 2025, month: 1, day: 28 },
        description: 'Last day of lunar year 2024'
      },
      // Leap month conversions
      {
        lunar: { year: 2024, month: 4, day: 1, isLeapMonth: true },
        expected: { year: 2024, month: 5, day: 9 },
        description: 'First day of leap month 2024'
      },
      {
        lunar: { year: 2024, month: 4, day: 29, isLeapMonth: true },
        expected: { year: 2024, month: 6, day: 6 },
        description: 'Last day of leap month 2024'
      },
      // Different years with leap months
      {
        lunar: { year: 2025, month: 6, day: 15, isLeapMonth: false },
        expected: { year: 2025, month: 7, day: 20 },
        description: 'Regular month in non-leap year'
      },
      {
        lunar: { year: 2028, month: 6, day: 15, isLeapMonth: true },
        expected: { year: 2028, month: 7, day: 28 },
        description: 'Leap month in 2028'
      },
      // Edge cases
      {
        lunar: { year: 2033, month: 3, day: 30, isLeapMonth: true },
        expected: { year: 2033, month: 5, day: 10 },
        description: 'Last day of leap month'
      },
      {
        lunar: { year: 2035, month: 8, day: 1, isLeapMonth: true },
        expected: { year: 2035, month: 9, day: 15 },
        description: 'Leap month in later part of year'
      },
      {
        lunar: { year: 2024, month: 8, day: 15, isLeapMonth: false },
        expected: { year: 2024, month: 9, day: 17 },
        description: 'Mid-Autumn Festival 2024'
      },
      {
        lunar: { year: 2025, month: 8, day: 15, isLeapMonth: false },
        expected: { year: 2025, month: 10, day: 6 },
        description: 'Mid-Autumn Festival 2025'
      },
      {
        lunar: { year: 2026, month: 8, day: 15, isLeapMonth: false },
        expected: { year: 2026, month: 9, day: 25 },
        description: 'Mid-Autumn Festival 2026'
      }
    ];

    test.each(testCases)('$description', ({ lunar, expected }) => {
      const result = LunarCalendarConverter.lunarToGregorian(lunar);
      expect(result).toEqual(expected);
    });

    // Error cases
    describe('error handling', () => {
      test('returns null for invalid leap month', () => {
        const result = LunarCalendarConverter.lunarToGregorian({
          year: 2024, month: 5, day: 1, isLeapMonth: true // 2024's leap month is 4
        });
        expect(result).toBeNull();
      });

      test('returns null for invalid day', () => {
        const result = LunarCalendarConverter.lunarToGregorian({
          year: 2024, month: 1, day: 31, isLeapMonth: false // Month 1 has 29 days
        });
        expect(result).toBeNull();
      });

      test('returns null for year out of range', () => {
        const result = LunarCalendarConverter.lunarToGregorian({
          year: 2054, month: 1, day: 1, isLeapMonth: false
        });
        expect(result).toBeNull();
      });
    });
  });

  describe('getMultiYearDates', () => {
    test('generates correct sequence of dates', () => {
      const results = LunarCalendarConverter.getMultiYearDates(1, 1, false);
      const currentYear = new Date().getFullYear();
      
      // Check sequence
      expect(results[0].year).toBe(currentYear);
      expect(results[results.length - 1].year).toBeLessThanOrEqual(2053);
      
      // Check consecutive years
      for (let i = 1; i < results.length; i++) {
        expect(results[i].year).toBe(results[i-1].year + 1);
      }
    });

    test('handles leap month correctly', () => {
      // 2024 has leap month 4
      const results = LunarCalendarConverter.getMultiYearDates(4, 15, true);
      const result2024 = results.find(d => d.year === 2024);
      expect(result2024).toEqual({
        year: 2024,
        month: 5,
        day: 23
      });
    });

    test('maintains consistent lunar dates across years', () => {
      const month = 8;
      const day = 15;
      const results = LunarCalendarConverter.getMultiYearDates(month, day, false);
      
      // Mid-Autumn Festival should be in September/October
      results.forEach(date => {
        expect(date.month).toBeGreaterThanOrEqual(9);
        expect(date.month).toBeLessThanOrEqual(10);
      });
    });
  });
}); 