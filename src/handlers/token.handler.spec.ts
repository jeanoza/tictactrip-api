import assert from "assert";
import { validateEmail } from "./token.handler";

describe("validateEmail", () => {
  it("returns true when email is valid", () => {
    const input = "choikb916@gmail.com";
    assert.strictEqual(validateEmail(input), true);
  });
  it("returns false when email is invalid", () => {
    const input = "choikb916@gmail.";
    assert.strictEqual(validateEmail(input), false);
  });
});
