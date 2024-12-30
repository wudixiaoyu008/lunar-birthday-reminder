export type LunarDate = {
  year: number;
  month: number;
  day: number;
  isLeapMonth?: boolean;
};

export type GregorianDate = {
  year: number;
  month: number;
  day: number;
};

export interface Birthday {
  name: string;
  lunarBirthday: LunarDate;
}
