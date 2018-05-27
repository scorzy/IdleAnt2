import { FormatPipe } from "./format.pipe";
import { OptionsService } from "./options.service";

describe("FormatPipe", () => {
  it("create an instance", () => {
    // const options = new OptionsService();
    const pipe = new FormatPipe(null);
    expect(pipe).toBeTruthy();
  });
});
