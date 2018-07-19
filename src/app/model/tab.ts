import { IUnlocable } from "./iunlocable";

export class Tab implements IUnlocable {
  unlocked = false;
  constructor(public id: string) {
    //
  }
  unlock() {
    if (this.unlocked) return false;
    this.unlocked = true;
  }
  getSave(): any {
    const data: any = {
      i: this.id
    };
    if (this.unlocked) data.u = this.unlocked;
    return data;
  }
  restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) return false;
    this.unlocked = !!data.u;
  }
}
