import { LunarDate, GregorianDate } from './types';

// Lunar New Year dates in Gregorian calendar (2024-2053)
const LUNAR_NEW_YEAR: Record<number, [number, number]> = {
  2024: [2, 10],  // Feb 10, 2024
  2025: [1, 29],  // Jan 29, 2025
  2026: [2, 17],  // Feb 17, 2026
  2027: [2, 6],   // Feb 6, 2027
  2028: [1, 26],  // Jan 26, 2028
  2029: [2, 13],  // Feb 13, 2029
  2030: [2, 3],   // Feb 3, 2030
  2031: [1, 23],  // Jan 23, 2031
  2032: [2, 11],  // Feb 11, 2032
  2033: [1, 31],  // Jan 31, 2033
  2034: [2, 19],  // Feb 19, 2034
  2035: [2, 8],   // Feb 8, 2035
  2036: [1, 28],  // Jan 28, 2036
  2037: [2, 15],  // Feb 15, 2037
  2038: [2, 4],   // Feb 4, 2038
  2039: [1, 24],  // Jan 24, 2039
  2040: [2, 12],  // Feb 12, 2040
  2041: [2, 1],   // Feb 1, 2041
  2042: [1, 22],  // Jan 22, 2042
  2043: [2, 10],  // Feb 10, 2043
  2044: [1, 30],  // Jan 30, 2044
  2045: [2, 17],  // Feb 17, 2045
  2046: [2, 6],   // Feb 6, 2046
  2047: [1, 26],  // Jan 26, 2047
  2048: [2, 14],  // Feb 14, 2048
  2049: [2, 2],   // Feb 2, 2049
  2050: [1, 23],  // Jan 23, 2050
  2051: [2, 11],  // Feb 11, 2051
  2052: [1, 31],  // Jan 31, 2052
  2053: [2, 19]   // Feb 19, 2053
};

// Lunar month lengths and leap month information
interface YearData {
  months: number[];  // Length of each month (29 or 30 days)
  leapMonth?: number; // Which month is the leap month (1-12), if any
}

const LUNAR_YEAR_DATA: Record<number, YearData> = {
  2024: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
    leapMonth: 4
  },
  2025: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]
  },
  2026: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30],
    leapMonth: 12
  },
  2027: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2028: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 6
  },
  2029: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2030: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2031: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30],
    leapMonth: 5
  },
  2032: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2033: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 3
  },
  2034: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2035: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 8
  },
  2036: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2037: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 6
  },
  2038: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2039: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]
  },
  2040: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 4
  },
  2041: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2042: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 3
  },
  2043: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2044: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 7
  },
  2045: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2046: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]
  },
  2047: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 5
  },
  2048: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2049: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 4
  },
  2050: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  },
  2051: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]
  },
  2052: {
    months: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
    leapMonth: 3
  },
  2053: {
    months: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
  }
};

export class LunarCalendarConverter {
  /**
   * Converts a lunar date to a Gregorian date
   */
  static lunarToGregorian(lunarDate: LunarDate): GregorianDate | null {
    try {
      const { year, month, day, isLeapMonth } = lunarDate;
      
      // Validate input
      if (!LUNAR_NEW_YEAR[year] || !LUNAR_YEAR_DATA[year]) {
        console.error('Year must be between 1940 and 2053');
        return null;
      }

      const yearData = LUNAR_YEAR_DATA[year];
      
      // Validate month and leap month
      if (isLeapMonth && yearData.leapMonth !== month) {
        console.error('Invalid leap month');
        return null;
      }

      // Validate day
      const monthIndex = month - 1 + (isLeapMonth ? 1 : 0);
      if (day < 1 || day > yearData.months[monthIndex]) {
        console.error('Invalid day for this lunar month');
        return null;
      }

      // Get lunar new year date
      const [newYearMonth, newYearDay] = LUNAR_NEW_YEAR[year];
      // Create date with UTC time to avoid timezone issues
      const baseDate = new Date(Date.UTC(year, newYearMonth - 1, newYearDay));

      // Calculate days to add
      let daysToAdd = 0;
      for (let i = 0; i < monthIndex; i++) {
        daysToAdd += yearData.months[i];
      }
      daysToAdd += day - 1;

      // Calculate final date using UTC
      const resultDate = new Date(baseDate);
      resultDate.setUTCDate(baseDate.getUTCDate() + daysToAdd);

      return {
        year: resultDate.getUTCFullYear(),
        month: resultDate.getUTCMonth() + 1,
        day: resultDate.getUTCDate()
      };
    } catch (error) {
      console.error('Conversion error:', error);
      return null;
    }
  }

  /**
   * Gets Gregorian dates from current year to 2053 for a lunar month and day
   */
  static getMultiYearDates(month: number, day: number, isLeapMonth: boolean = false): GregorianDate[] {
    const currentYear = new Date().getFullYear();
    // Only generate dates for years we have data for
    const years = Object.keys(LUNAR_YEAR_DATA)
      .map(Number)
      .filter(year => year >= currentYear)
      .sort((a, b) => a - b);

    return years
      .map(year => {
        const lunarDate: LunarDate = {
          year,
          month,
          day,
          isLeapMonth
        };
        return this.lunarToGregorian(lunarDate);
      })
      .filter((date): date is GregorianDate => date !== null);
  }
}
