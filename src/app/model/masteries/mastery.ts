export enum MasteryTypes {
  MORE_FOLLOWERS = 0,
  MORE_IDLE_8H,
  SCIENCE_PRESTIGE
}

export class Mastery {
  static readonly normalColor = "#4286f4";
  static readonly avaiableColor = "green";
  static readonly ownedColor = "red";

  static getDescription(type: MasteryTypes, num = 1): string {
    let ret = "";
    switch (type) {
      case MasteryTypes.MORE_FOLLOWERS: {
        ret = "+" + 100 * num + "% more followers";
        break;
      }
      case MasteryTypes.MORE_IDLE_8H: {
        ret = "+" + 30 * num + "% idle time after 8h";
        break;
      }
      case MasteryTypes.SCIENCE_PRESTIGE: {
        ret = "+10*log10(unspent experience)% \n science boost";
        break;
      }
    }
    return ret;
  }

  label = "";
  color = "blue";
  avaiable = false;
  owned = false;

  constructor(public id: number, public type: MasteryTypes) {
    this.label = Mastery.getDescription(type);
    this.color = Mastery.normalColor;
  }
}
