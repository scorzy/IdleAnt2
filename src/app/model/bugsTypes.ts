export enum Tags {
  FARMER,
  MINER,
  SOIL_G
}

export enum BugTypes {
  ANT = 0,
  BEE,
  WASP,
  SUPER_MAJOR
}

export class Bug {
  constructor(
    public priceMulti: number,
    public prodMulti: number,
    public efficiencyMulti: number,
    public teamPriceMulti: number,
    public twinPriceMulti: number,
    public color: string
  ) {}
}
export const BUGS = {
  0: new Bug(1, 1, 1, 1, 1, "#36a2eb"),
  1: new Bug(1.5, 1.1, 1.2, 0.1, 1, "#FFCE56"),
  2: new Bug(0.5, 0.9, 1, 10, 0.1, "#ff9f40"),
  3: new Bug(3, 4, 1, 1.5, 1.5, "#FF6384")
};
