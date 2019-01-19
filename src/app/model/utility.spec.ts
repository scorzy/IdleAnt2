import { Utility } from "./utility";

describe("Utility", () => {
  it("should create an instance", () => {
    expect(new Utility()).toBeTruthy();
  });

  it("convertToRoman", () => {
    expect(Utility.convertToRoman(1)).toBe("I");
    expect(Utility.convertToRoman(2)).toBe("II");
    expect(Utility.convertToRoman(4)).toBe("IV");
    expect(Utility.convertToRoman(5)).toBe("V");
    expect(Utility.convertToRoman(9)).toBe("IX");
    expect(Utility.convertToRoman(10)).toBe("X");
    expect(Utility.convertToRoman(17)).toBe("XVII");

    expect(Utility.convertToRoman(246)).toBe("CCXLVI");
    expect(Utility.convertToRoman(1776)).toBe("MDCCLXXVI");
    expect(Utility.convertToRoman(1954)).toBe("MCMLIV");
    expect(Utility.convertToRoman(1990)).toBe("MCMXC");
  });
});
