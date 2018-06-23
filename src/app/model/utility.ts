import { ClrDatagridComparatorInterface } from "@clr/angular";
import { Production } from "./production";
import { BaseUnit } from "./baseUnit";
import { FullUnit } from "./full-unit";

export class Utility {
  // static getRandom(arr: any[]): any {
  //   return arr[Math.floor(Math.random() * arr.length)];
  // }

  /**
   * Solve an equation, up to cubic equation ax^3 + bx^2 + cx + d = 0
   *
   * @param a x^3
   * @param b x^2
   * @param c x
   * @param d constant
   * @returns solutions, real roots only
   */
  static solveEquation(
    a: Decimal,
    b: Decimal,
    c: Decimal,
    d: Decimal
  ): Decimal[] {
    // Thanks to:
    // https://stackoverflow.com/questions/27176423/function-to-solve-cubic-equation-analytically
    // http://www.wolframalpha.com/calculators/equation-solver/

    if (a.abs().lt(Number.EPSILON)) {
      a = b;
      b = c;
      c = d;
      if (a.abs().lt(Number.EPSILON)) {
        // Linear case, ax+b=0
        a = b;
        b = c;
        if (a.abs().lt(Number.EPSILON)) {
          // Degenerate case
          return [];
        }

        return [b.times(-1).div(a)];
      }

      const D = b.pow(2).minus(a.times(c).times(4));
      if (D.abs().lt(Number.EPSILON)) {
        return [b.times(-1).div(a.times(2))];
      } else if (D.gt(0)) {
        return [
          D.sqrt()
            .minus(b)
            .div(a.times(2)),
          D.sqrt()
            .plus(b)
            .times(-1)
            .div(a.times(2))
        ];
      }

      return [];
    }
    return Utility.solveCubic(a, b, c, d);
  }
  /**
   * Solve an equation, cubic only
   *
   * @param a x^3
   * @param b x^2
   * @param c x
   * @param d constant
   * @returns solutions, real roots only
   */
  private static solveCubic(
    a: Decimal,
    b: Decimal,
    c: Decimal,
    d: Decimal
  ): Decimal[] {
    const p = a
      .times(c)
      .times(3)
      .minus(b.pow(2))
      .div(3)
      .div(a)
      .div(a);
    const q = b
      .pow(3)
      .times(2)
      .minus(
        a
          .times(b)
          .times(c)
          .times(9)
      )
      .plus(
        a
          .times(a)
          .times(d)
          .times(27)
      )
      .div(a.pow(3).times(27));
    let roots: Decimal[];

    if (p.abs().lt(Number.EPSILON)) {
      roots = [q.times(-1).cbrt()];
    } else if (q.abs().lt(Number.EPSILON)) {
      roots = [new Decimal(0)].concat(
        p.lt(0)
          ? [
              p.times(-1).sqrt(),
              p
                .times(-1)
                .sqrt()
                .times(-1)
            ]
          : []
      );
    } else {
      const D = q
        .pow(2)
        .div(4)
        .plus(p.pow(3).div(27));

      if (D.abs().lt(Number.EPSILON)) {
        // D = 0 -> two roots
        roots = [q.times(-1.5).div(p), new Decimal(3).times(q).times(p)];
      } else if (D.gt(0)) {
        // Only one real root
        const first = q.times(-0.5);
        const second = D.sqrt();
        const q3 = first.minus(second);

        //  workaround for aprossimation
        if (q3.toNumber() === 0) {
          // q3 = new Decimal(1).div(
          //   Decimal.max(a.abs(), b.abs())
          //     .max(c.abs())
          //     .max(d.abs())
          // );

          return [d.div(a.abs()).cbrt()];
        }
        const u = Decimal.cbrt(q3);
        roots = [u.minus(p.div(u.times(3)))];
      } else {
        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
        const u = new Decimal(2).times(Decimal.sqrt(p.times(-1).div(3)));

        let acos = new Decimal(q);
        acos = acos.div(p);
        acos = acos.div(u);
        acos = acos.times(3);
        //  workaround for aprossimation
        if (acos.lt(-1)) {
          return [];
        }

        //  workaround for aprossimation 2
        const acos2 = Decimal.max(Decimal.min(acos, 1), -1).toNumber();
        const t = new Decimal(Math.acos(acos2) / 3);

        // const t = Math.acos(3 * q / p / u) / 3;  // D < 0 implies p < 0 and acos argument in [-1..1]
        const k = new Decimal(2).times(Math.PI).div(3);
        roots = [
          u.times(Math.cos(t.toNumber())),
          u.times(Math.cos(t.minus(k).toNumber())),
          u.times(Math.cos(t.minus(k.times(2)).toNumber()))
        ];
      }
    }

    // Convert back from depressed cubic
    for (let i = 0; i < roots.length; i++) {
      roots[i] = roots[i].minus(b.div(a.times(3)));
    }

    return roots;
  }
}

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
