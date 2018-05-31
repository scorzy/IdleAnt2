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
    return {
      i: this.id,
      u: this.unlocked
    };
  }
  restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) return false;
    if ("u" in data) this.unlocked = data.u;
  }
}
