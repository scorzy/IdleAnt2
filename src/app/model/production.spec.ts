import { Production } from "./production";

describe("Production", () => {
  const producer = jasmine.createSpyObj("FullUnit", ["id"]);
  const product = jasmine.createSpyObj("FullUnit", ["id"]);
  it("should create an instance", () => {
    expect(new Production(producer, product)).toBeTruthy();
  });
  it("should create an instance with rateo", () => {
    expect(new Production(producer, product, new Decimal(10))).toBeTruthy();
  });
});
