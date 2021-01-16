'use strict';

const TransactionDate = require("../lib/TransactionDate");

describe("TransactionDate", function () {

  beforeEach(() => {
    jasmine.clock().mockDate(new Date(2012, 10, 5));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe("Date Retrieval Functionality", function () {
    it("Gets the current date from the system", function () {
      expect(TransactionDate.getDate()).toEqual("05/11/2012");
    });
  });
});