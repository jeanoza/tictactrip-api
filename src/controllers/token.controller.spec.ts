import assert from "assert";
import TokenController from "./token.controller";

describe("validateEmail", () => {
  it("returns true when email is valid", () => {
    const input = "choikb916@gmail.com";
    assert.strictEqual(TokenController.validateEmail(input), true);
  });
  it("returns false when email is invalid", () => {
    const input = "choikb916@gmail.";
    assert.strictEqual(TokenController.validateEmail(input), false);
  });
});
