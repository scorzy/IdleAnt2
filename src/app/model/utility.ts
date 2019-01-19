import { ClrDatagridComparatorInterface } from "@clr/angular";
import { BaseUnit } from "./baseUnit";
import { BugTypes } from "./bugsTypes";
import { FullUnit } from "./full-unit";
import { Production } from "./production";
import { Run } from "./stats/run";
import { STRINGS } from "./strings";

export class Utility {
  static getBugName(bug: BugTypes) {
    return STRINGS.bug[bug];
  }
  static random(min: Decimal = new Decimal(0), max: Decimal = new Decimal(1)) {
    return min.plus(max.minus(min).times(Math.random()));
  }
}

//#region Clarity Datagrid custom sorterer
// tslint:disable-next-line:max-classes-per-file
export class ProductionSorter
  implements ClrDatagridComparatorInterface<Production> {
  compare(a: Production, b: Production) {
    return a.prodPerSec.cmp(b.prodPerSec);
  }
}
// tslint:disable-next-line:max-classes-per-file
export class TotalProductionSorter
  implements ClrDatagridComparatorInterface<Production> {
  compare(a: Production, b: Production) {
    return a.prodPerSec
      .times(a.producer.quantity)
      .cmp(b.prodPerSec.times(b.producer.quantity));
  }
}
// tslint:disable-next-line:max-classes-per-file
export class UnitQuantitySorter
  implements ClrDatagridComparatorInterface<BaseUnit> {
  compare(a: BaseUnit, b: BaseUnit) {
    return a.quantity.cmp(b.quantity);
  }
}
// tslint:disable-next-line:max-classes-per-file
export class UnitBoughtSorter
  implements ClrDatagridComparatorInterface<FullUnit> {
  compare(a: FullUnit, b: FullUnit) {
    return a.buyAction.quantity.cmp(b.buyAction.quantity);
  }
}
// tslint:disable-next-line:max-classes-per-file
export class UnitTeamSorter
  implements ClrDatagridComparatorInterface<FullUnit> {
  compare(a: FullUnit, b: FullUnit) {
    return a.teamAction.quantity.cmp(b.teamAction.quantity);
  }
}
// tslint:disable-next-line:max-classes-per-file
export class UnitTwinSorter
  implements ClrDatagridComparatorInterface<FullUnit> {
  compare(a: FullUnit, b: FullUnit) {
    return a.twinAction.quantity.cmp(b.twinAction.quantity);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class UnitAutoHatchSorter
  implements ClrDatagridComparatorInterface<FullUnit> {
  compare(a: FullUnit, b: FullUnit) {
    return a.buyAction.autoBuyer.quantity.cmp(b.buyAction.autoBuyer.quantity);
  }
}
// tslint:disable-next-line:max-classes-per-file
export class UnitAutoTeamSorter
  implements ClrDatagridComparatorInterface<FullUnit> {
  compare(a: FullUnit, b: FullUnit) {
    return a.teamAction.autoBuyer.quantity.cmp(b.teamAction.autoBuyer.quantity);
  }
}
// tslint:disable-next-line:max-classes-per-file
export class UnitAutoTwinSorter
  implements ClrDatagridComparatorInterface<FullUnit> {
  compare(a: FullUnit, b: FullUnit) {
    return a.twinAction.autoBuyer.quantity.cmp(b.twinAction.autoBuyer.quantity);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class RunExpSorter implements ClrDatagridComparatorInterface<Run> {
  compare(a: Run, b: Run) {
    return a.experience.cmp(b.experience);
  }
}
// tslint:disable-next-line:max-classes-per-file
export class RunExpPerSecSorter implements ClrDatagridComparatorInterface<Run> {
  compare(a: Run, b: Run) {
    return a.expPerSec.cmp(b.expPerSec);
  }
}
//#endregion
