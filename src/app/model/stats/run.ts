export class Run {
  static getRun(data: any): Run {
    const run = new Run();
    run.restore(data);
    return run;
  }
  constructor(
    public endDate = new Date(),
    public worldName = "",
    public experience = new Decimal(0),
    public completed = false
  ) {}

  //#region Save and Load
  getSave(): any {
    return {
      f: this.endDate,
      w: this.worldName,
      e: this.experience,
      c: this.completed
    };
  }
  restore(data: any) {
    if ("f" in data) this.endDate = new Date(data.f);
    if ("w" in data) this.worldName = data.w;
    if ("e" in data) this.experience = new Decimal(data.e);
    this.completed = !!data.c;
  }
  //#endregion
}
