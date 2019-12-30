"use strict";

const { expect } = require("chai");

const parseClassifiers = require("../../src/handicap/parse-classifiers.js");

describe("handicap/parse-classifiers.js", function () {

    it("returns [] for empty input ('')", function () {
        return expect(parseClassifiers("")).to.deep.equal([]);
    });

    it("returns [] for empty brackets ('[]')", function () {
        return expect(parseClassifiers("[]")).to.deep.equal([]);
    });

    it("splits bracket contents", function () {
        return expect(parseClassifiers("[FOO,BAR]")).to.deep.equal(["FOO", "BAR"]);
    });

});
