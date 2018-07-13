import { Pipe, PipeTransform } from "@angular/core";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";

@Pipe({
  name: "endIn"
})
export class EndInPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return !isNaN(value) && value > 0
      ? distanceInWordsToNow(new Date(Date.now() + value))
      : "never";
  }
}
