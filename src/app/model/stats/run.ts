export class Run {
  static getRun(data: any): Run {
    const run = new Run();
    run.restore(data);
    return run;
  }
  expPerSec = new Decimal(0);
  constructor(
    public endDate = new Date(),
    public startDate = new Date(),
    public worldName = "",
    public experience = new Decimal(0),
    public completed = false
  ) {}

  reloadExpPerSec() {
    this.expPerSec = this.experience.div(
      (this.endDate.getTime() - this.startDate.getTime()) / 1000
    );
  }

  //#region Save and Load
  getSave(): any {
    return {
      f: this.endDate,
      w: this.worldName,
      e: this.experience,
      c: this.completed,
      s: this.startDate
    };
  }
  restore(data: any) {
    if ("f" in data) this.endDate = new Date(data.f);
    if ("s" in data) this.startDate = new Date(data.s);
    if ("w" in data) this.worldName = data.w;
    if ("e" in data) this.experience = new Decimal(data.e);
    this.completed = !!data.c;
    this.reloadExpPerSec();
  }
  //#endregion
}
