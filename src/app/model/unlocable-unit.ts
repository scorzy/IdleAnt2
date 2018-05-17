import { BaseUnit } from "./baseUnit";
import { Unlocable } from "./interfaces";

export class UnlocableUnit extends BaseUnit implements Unlocable {
    unlocked = false;

    onUnlock(): boolean {
        return true;
    }
    unlock(): boolean {
        if (this.unlocked) {
            return false;
        }
        this.unlocked = true;
        this.onUnlock();

        return true;
    }
    getSave(): any {
        const data = super.getSave();
        data.u = this.unlocked;

        return data;
    }
    restore(data: any): boolean {
        if (super.restore(data)) {
            this.unlocked = !!data.u;

            return true;
        } else {
            return false;
        }
    }
}
