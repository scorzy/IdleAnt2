import { Utility } from "./utility";

describe("Utility", () => {
  it("should create an instance", () => {
    expect(new Utility()).toBeTruthy();
  });

  describe("linear tests", () => {
    const result = Utility.solveCubic(
      new Decimal(0),
      new Decimal(0),
      new Decimal(1),
      new Decimal(-1)
    );
    const actualJSON = JSON.stringify(result);
    const expectedJSON = JSON.stringify([new Decimal(1)]);
    it("1x -1 => x = 1", () => expect(actualJSON).toBe(expectedJSON));
  });

  describe("quadratic tests", () => {
    const result = Utility.solveCubic(
      new Decimal(0),
      new Decimal(1),
      new Decimal(-2),
      new Decimal(1)
    );
    const actualJSON = JSON.stringify(result);
    const expectedJSON = JSON.stringify([new Decimal(1)]);
    it("x^2 - 2x + 1 => x = 1 ", () => expect(actualJSON).toBe(expectedJSON));
  });

  describe("quadratic test 2", () => {
    const result = Utility.solveCubic(
      new Decimal(0),
      new Decimal(2),
      new Decimal(5),
      new Decimal(-3)
    );
    const actualJSON = JSON.stringify(result);
    const expectedJSON = JSON.stringify([new Decimal(0.5), new Decimal(-3)]);
    it("2x^2 - 5x - 3 => x = -3  0.5 ", () =>
      expect(actualJSON).toBe(expectedJSON));
  });

  describe("cubic tests", () => {
    const result = Utility.solveCubic(
      new Decimal(1),
      new Decimal(-7),
      new Decimal(4),
      new Decimal(12)
    );
    const actualJSON = JSON.stringify(result);
    const expectedJSON = '["6","2","-1"]';
    it("x^3 – 7x^2 + 4x + 12 => x = 1 ", () =>
      expect(actualJSON).toBe(expectedJSON));
  });

  describe("cubic tests 2", () => {
    const result = Utility.solveCubic(
      new Decimal(-44),
      new Decimal(1413637),
      new Decimal(800766291),
      new Decimal(187091096050)
    );
    const actualJSON = JSON.stringify(result);
    const expectedJSON = '["32688.834485634798"]';
    it("", () => expect(actualJSON).toBe(expectedJSON));
  });

  describe("cubic tests 3", () => {
    const result = Utility.solveCubic(
      new Decimal(168.22549160416666667),
      new Decimal(-62370.8640283213725),
      new Decimal(24818289.542591014547),
      new Decimal(155768059470.00133285)
    );
    const actualJSON = JSON.stringify(result);
    const expectedJSON = '["-821.551274779984"]';
    it("", () => expect(actualJSON).toBe(expectedJSON));
  });

  describe("degenerate case", () => {
    const result = Utility.solveCubic(
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0)
    );
    it("", () => result.length === 0);
  });

  describe("-10 = 0", () => {
    const result = Utility.solveCubic(
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(-10)
    );
    it("", () => result.length === 0);
  });

  describe("x^3 + 1000", () => {
    const result = Utility.solveCubic(
      new Decimal(1),
      new Decimal(0),
      new Decimal(0),
      new Decimal(1000)
    );
    const actualJSON = JSON.stringify(result);
    const expectedJSON = '["-10"]';
    it("x = -10", () => expect(actualJSON).toBe(expectedJSON));
  });

  describe("x^3 - x100", () => {
    const result = Utility.solveCubic(
      new Decimal(1),
      new Decimal(0),
      new Decimal(-100),
      new Decimal(0)
    );

    const actualJSON = JSON.stringify(result);
    const expectedJSON = '["0","10","-10"]';
    it("x = -10, 0, 10", () => expect(actualJSON).toBe(expectedJSON));
  });
});
