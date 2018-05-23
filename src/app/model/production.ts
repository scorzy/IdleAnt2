import { FullUnit } from "./full-unit";

export class Production {
  constructor(
    public prductor: FullUnit,
    public product: FullUnit,
    public rateo = new Decimal(1)
  ) {}
}
