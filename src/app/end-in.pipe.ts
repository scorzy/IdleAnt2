import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "endIn"
})
export class EndInPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return !isNaN(value) && value > 0
      ? moment.duration(value).humanize()
      : "never";
  }
}
