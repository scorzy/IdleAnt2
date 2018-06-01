import { ClrDatagridComparatorInterface } from "@clr/angular";
import { Production } from "./production";

export class Utility {
  /**
   * Cube root function
   *
   * @param x cube root
   */
  static cuberoot(x: Decimal): Decimal {
    const y = x.abs().pow(1 / 3);

    return x.lt(0) ? y.times(-1) : y;
  }

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
  static solveCubic(a: Decimal, b: Decimal, c: Decimal, d: Decimal): Decimal[] {
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
      // p = 0 -> t^3 = -q -> t = -q^1/3
      roots = [this.cuberoot(q.times(-1))];
    } else if (q.abs().lt(Number.EPSILON)) {
      // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
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
        .div(new Decimal(4))
        .plus(p.pow(3).div(27));
      // console.log("D: " + D.toString())

      if (D.abs().lt(Number.EPSILON)) {
        // D = 0 -> two roots
        roots = [q.times(-1.5).div(p), new Decimal(3).times(q).times(p)];
      } else if (D.gt(0)) {
        // Only one real root
        // var u = cuberoot(-q/2 - Math.sqrt(D));
        // roots = [u - p/(3*u)];
        const u = this.cuberoot(q.times(-0.5).minus(D.sqrt()));
        roots = [u.minus(p.div(u.times(3)))];
      } else {
        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
        const u = new Decimal(2).times(Decimal.sqrt(p.times(-1).div(3)));
        // console.log(q.toString() + " " + p.toString() + " " + u.toString())
        // let acos = new Decimal(3).times(q).div(p).div(u)

        let acos = q;
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

        // console.log(roots[0].toString())
        // console.log(roots[1].toString())
        // console.log(roots[2].toString())
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
      .times(a.productor.quantity)
      .cmp(b.prodPerSec.times(b.productor.quantity));
  }
}
