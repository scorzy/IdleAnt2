import { Pipe, PipeTransform } from "@angular/core";
import { Utility } from "./model/utility";

@Pipe({
  name: "roman"
})
export class RomanPipe implements PipeTransform {
  transform(num: Decimal, args?: any): any {
    num = num.floor();
    return Utility.convertToRoman(num.toNumber());
  }
}
