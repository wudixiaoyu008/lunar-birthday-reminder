import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Lunar calendar data from 1940-2053
// Format: [month, day] of Chinese New Year in Gregorian calendar
const lunarNewYearDates = {
  1940: [2, 8], 1941: [1, 27], 1942: [2, 15], 1943: [2, 5], 1944: [1, 25],
  1945: [2, 13], 1946: [2, 2], 1947: [1, 22], 1948: [2, 10], 1949: [1, 29],
  1950: [2, 17], 1951: [2, 6], 1952: [1, 27], 1953: [2, 14], 1954: [2, 3],
  1955: [1, 24], 1956: [2, 12], 1957: [1, 31], 1958: [2, 18], 1959: [2, 8],
  1960: [1, 28], 1961: [2, 15], 1962: [2, 5], 1963: [1, 25], 1964: [2, 13],
  1965: [2, 2], 1966: [1, 21], 1967: [2, 9], 1968: [1, 30], 1969: [2, 17],
  1970: [2, 6], 1971: [1, 27], 1972: [2, 15], 1973: [2, 3], 1974: [1, 23],
  1975: [2, 11], 1976: [1, 31], 1977: [2, 18], 1978: [2, 7], 1979: [1, 28],
  1980: [2, 16], 1981: [2, 5], 1982: [1, 25], 1983: [2, 13], 1984: [2, 2],
  1985: [2, 20], 1986: [2, 9], 1987: [1, 29], 1988: [2, 17], 1989: [2, 6],
  1990: [1, 27], 1991: [2, 15], 1992: [2, 4], 1993: [1, 23], 1994: [2, 10],
  1995: [1, 31], 1996: [2, 19], 1997: [2, 7], 1998: [1, 28], 1999: [2, 16],
  2000: [2, 5], 2001: [1, 24], 2002: [2, 12], 2003: [2, 1], 2004: [1, 22],
  2005: [2, 9], 2006: [1, 29], 2007: [2, 18], 2008: [2, 7], 2009: [1, 26],
  2010: [2, 14], 2011: [2, 3], 2012: [1, 23], 2013: [2, 10], 2014: [1, 31],
  2015: [2, 19], 2016: [2, 8], 2017: [1, 28], 2018: [2, 16], 2019: [2, 5],
  2020: [1, 25], 2021: [2, 12], 2022: [2, 1], 2023: [1, 22], 2024: [2, 10],
  2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13],
  2030: [2, 3], 2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19],
  2035: [2, 8], 2036: [1, 28], 2037: [2, 15], 2038: [2, 4], 2039: [1, 24],
  2040: [2, 12], 2041: [2, 1], 2042: [1, 22], 2043: [2, 10], 2044: [1, 30],
  2045: [2, 17], 2046: [2, 6], 2047: [1, 26], 2048: [2, 14], 2049: [2, 2],
  2050: [1, 23], 2051: [2, 11], 2052: [1, 31], 2053: [2, 19]
};

const LunarCalendarConverter = () => {
  const [lunarYear, setLunarYear] = useState(2024);
  const [lunarMonth, setLunarMonth] = useState(1);
  const [lunarDay, setLunarDay] = useState(1);
  const [gregorianDate, setGregorianDate] = useState(null);
  const [error, setError] = useState('');

  const convertToGregorian = () => {
    setError('');
    
    if (!lunarNewYearDates[lunarYear]) {
      setError('Year must be between 1940 and 2053');
      setGregorianDate(null);
      return;
    }

    if (lunarMonth < 1 || lunarMonth > 12) {
      setError('Month must be between 1 and 12');
      setGregorianDate(null);
      return;
    }

    if (lunarDay < 1 || lunarDay > 30) {
      setError('Day must be between 1 and 30');
      setGregorianDate(null);
      return;
    }

    // Get lunar new year date for the input year
    const [newYearMonth, newYearDay] = lunarNewYearDates[lunarYear];
    
    // Create Date object for lunar new year
    const lunarNewYear = new Date(lunarYear, newYearMonth - 1, newYearDay);
    
    // Approximate days since lunar new year
    // Note: This is a simplified calculation and might need adjustment for leap months
    const daysToAdd = ((lunarMonth - 1) * 29.5) + (lunarDay - 1);
    
    // Calculate gregorian date
    const resultDate = new Date(lunarNewYear);
    resultDate.setDate(lunarNewYear.getDate() + Math.floor(daysToAdd));
    
    setGregorianDate(resultDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Lunar Calendar Converter (1940-2053)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Year</label>
              <input
                type="number"
                value={lunarYear}
                onChange={(e) => setLunarYear(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
                min="1940"
                max="2053"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Month</label>
              <input
                type="number"
                value={lunarMonth}
                onChange={(e) => setLunarMonth(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
                min="1"
                max="12"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Day</label>
              <input
                type="number"
                value={lunarDay}
                onChange={(e) => setLunarDay(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
                min="1"
                max="30"
              />
            </div>
          </div>
          
          <button
            onClick={convertToGregorian}
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Convert
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              <p className="text-center">{error}</p>
            </div>
          )}
          
          {gregorianDate && !error && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-center font-medium">{gregorianDate}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LunarCalendarConverter;