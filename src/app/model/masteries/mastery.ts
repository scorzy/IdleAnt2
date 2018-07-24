export enum MasteryTypes {
  MORE_FOLLOWERS = 0,
  MORE_IDLE_8H
}

export class Mastery {
  static readonly normalColor = "#4286f4";
  static readonly avaiableColor = "green";
  static readonly ownedColor = "red";

  label = "";
  color = "blue";
  avaiable = false;
  owned = false;

  constructor(public id: number, public type: MasteryTypes) {
    switch (type) {
      case MasteryTypes.MORE_FOLLOWERS: {
        this.label = "+100% more followers";
        this.color = Mastery.normalColor;
        break;
      }
      case MasteryTypes.MORE_IDLE_8H: {
        this.label = "+30% idle time after 8h";
        this.color = Mastery.normalColor;
        break;
      }
    }
  }
}
