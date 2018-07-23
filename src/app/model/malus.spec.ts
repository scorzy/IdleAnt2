import { Malus } from "./malus";

describe("Malus", () => {
  it("should create an instance", () => {
    expect(new Malus("")).toBeTruthy();
  });
  it("Kill", () => {
    const malus = new Malus("");
    expect(malus.isActive()).toBeFalsy();

    malus.unlocked = true;
    malus.quantity = new Decimal(1);
    malus.efficiency = 100;

    expect(malus.isActive()).toBeTruthy();
    expect(malus.isKilled).toBeFalsy();

    malus.kill();

    expect(malus.isActive()).toBeFalsy();
    expect(malus.isKilled).toBeTruthy();
  });
  it("Save and Load", () => {
    const malus1 = new Malus("");
    const malus2 = new Malus("");

    expect(malus2.isKilled).toBeFalsy();
    malus1.isKilled = true;
    const ret = malus2.restore(malus1.getSave());
    expect(ret).toBeTruthy();
    expect(malus2.isKilled).toBeTruthy();
  });
});
