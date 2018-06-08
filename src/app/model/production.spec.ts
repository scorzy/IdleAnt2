import { Production } from "./production";
import { BaseUnit } from "./baseUnit";

describe("Production", () => {
  const producer = jasmine.createSpyObj("FullUnit", ["id"]);
  const product = jasmine.createSpyObj("FullUnit", ["id"]);
  product.productionsBonus = new Array<[BaseUnit, Decimal]>();
  it("should create an instance", () => {
    expect(new Production(producer, product)).toBeTruthy();
  });
  it("should create an instance with rateo", () => {
    expect(new Production(producer, product, new Decimal(10))).toBeTruthy();
  });
});
