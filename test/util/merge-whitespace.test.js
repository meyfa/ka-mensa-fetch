"use strict";

const { expect } = require("chai");

const mergeWhitespace = require("../../src/util/merge-whitespace.js");

describe("util/merge-whitespace.js", function () {

    it("leaves empty string intact", function () {
        return expect(mergeWhitespace("")).to.equal("");
    });

    it("leaves single spaces intact", function () {
        return expect(mergeWhitespace(" foo bar baz ")).to.equal(" foo bar baz ");
    });

    it("merges consecutive spaces", function () {
        return expect(mergeWhitespace("  foo     bar  ")).to.equal(" foo bar ");
    });

});
