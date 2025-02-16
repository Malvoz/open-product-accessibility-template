import { expect } from "chai";
import { validateOPAT } from "../src/validateOPAT";

describe("Validate OPAT metadata", () => {
  const validSchema = "opat-0.1.0.json";
  const invalidSchema = "opat-invalid.json";
  const validJSON = {
    title: "Lorem Ipsum Accessibility Conformance Report",
    product: {
      name: "Lorem Ipsum",
      version: "1.1",
      description: "Fake text",
    },
    author: {
      email: "cicero@example.com",
    },
    license: "CC-BY-4.0",
  };
  const invalidJSON1 = { foo: 2, bar: 4 };
  const invalidJSON2 = {
    title: "Lorem Ipsum Accessibility Conformance Report",
    product: {
      name: "Lorem Ipsum",
      version: "1.1",
      description: "Fake text",
    },
    author: {
      email: "cicero@example.com",
    },
    license: "INVALID",
  };
  let result = null;

  it("pass valid JSON with valid schema should return valid message", () => {
    result = validateOPAT(validJSON, validSchema);
    expect(result.result).to.equal(true);
    expect(result.message).to.equal("Valid!");
  });
  it("pass invalid JSON with valid schema should return invalid JSON message", () => {
    result = validateOPAT(invalidJSON1, validSchema);
    expect(result.result).to.equal(false);
    expect(result.message).to.equal(
      "Invalid: data must have required property 'title', " +
        "data must have required property 'product', " +
        "data must have required property 'author'"
    );
  });
  it("pass valid JSON with invalid schema should return invalid schema message", () => {
    result = validateOPAT(validJSON, invalidSchema);
    expect(result.result).to.equal(false);
    expect(result.message).to.equal("Invalid: schema is not valid");
  });
  it("pass invalid JSON with invalid schema should return invalid schema message", () => {
    result = validateOPAT(invalidJSON1, invalidSchema);
    expect(result.result).to.equal(false);
    expect(result.message).to.equal("Invalid: schema is not valid");
  });
  it("pass invalid license with valid schema should return invalid license message", () => {
    result = validateOPAT(invalidJSON2, validSchema);
    expect(result.result).to.equal(false);
    expect(result.message).to.equal(
      "Invalid: license 'INVALID' is not a recognized SPDX license (https://spdx.org/licenses/)"
    );
  });
});
