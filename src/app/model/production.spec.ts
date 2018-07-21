import { BaseUnit } from "./baseUnit";
import { FullUnit } from "./full-unit";
import { Production } from "./production";
import { ProductionBonus } from "./production-bonus";

describe("Production", () => {
  const producerSpy = jasmine.createSpyObj("FullUnit", ["id"]);
  const productSpy = jasmine.createSpyObj("FullUnit", ["id"]);
  productSpy.productionsBonus = new Array<[BaseUnit, Decimal]>();
  producerSpy.productionsEfficienty = new Array<[BaseUnit, Decimal]>();
  producerSpy.productionsAll = new Array<[BaseUnit, Decimal]>();

  let producer: FullUnit;
  let product: FullUnit;
  beforeEach(() => {
    producer = new FullUnit("");
    product = new FullUnit("");
  });

  it("should create an instance", () => {
    expect(new Production(producerSpy, productSpy)).toBeTruthy();
  });
  it("should create an instance with rateo", () => {
    expect(
      new Production(producerSpy, productSpy, new Decimal(10))
    ).toBeTruthy();
  });
  it("ReloadPerSec", () => {
    const base1 = new BaseUnit("");
    base1.quantity = new Decimal(1);
    producer.productionsAll.push(new ProductionBonus(base1, new Decimal(3)));
    producer.productionsEfficienty.push(
      new ProductionBonus(base1, new Decimal(1))
    );
    product.productionsBonus.push(new ProductionBonus(base1, new Decimal(4)));

    const prod = new Production(producer, product, new Decimal(2));
    prod.reloadProdPerSec();

    expect(prod.prodPerSec.toNumber()).toBe(80);
  });
});
