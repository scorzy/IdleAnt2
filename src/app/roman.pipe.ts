import { Pipe, PipeTransform } from "@angular/core";
import { convertToRoman } from "ant-utils";

@Pipe({
  name: "roman"
})
export class RomanPipe implements PipeTransform {
  transform(num: Decimal, args?: any): any {
    num = num.floor();
    return convertToRoman(num.toNumber());
  }
}
