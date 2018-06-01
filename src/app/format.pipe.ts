import { Pipe, PipeTransform } from "@angular/core";
import { OptionsService } from "./options.service";

@Pipe({
  name: "format"
})
export class FormatPipe implements PipeTransform {
  constructor(public options: OptionsService) {}

  transform(value: any, integer?: boolean): any {
    value = new Decimal(value);

    let str = value.abs().lessThan(10)
      ? value.toNumber().toFixed(2)
      : value.abs().lessThan(100)
        ? value.toNumber().toFixed(1)
        : (value.greaterThanOrEqualTo(0) ? "" : "-") +
          this.options.formatter.formatShort(value.abs());

    if (integer) str = str.replace(/\.0+$/, "");
    if (!this.options.usaFormat) str = str.replace(".", ",");

    return str;
  }
}
