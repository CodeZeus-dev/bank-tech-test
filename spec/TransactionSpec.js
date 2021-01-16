'use strict';

const Transaction = require('../lib/Transaction');

describe("Transaction", function () {
  let transaction;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2012, 10, 5));
    transaction = new Transaction("debit", 250, 500);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })

  describe("Getting Transaction attributes functionality", function () {
    it("gets the transaction date", function () {
      expect(transaction.getDate).toBeDefined();
      expect(transaction.getDate()).toEqual('05/11/2012');
    });

    it("gets the transaction type using the getType function", function () {
      expect(transaction.getType).toBeDefined();
    });

    it("gets the transaction type (debit)", function () {
      expect(transaction.getType()).toEqual("debit");
    });

    it("gets the transaction type (credit)", function () {
      transaction = new Transaction("credit", 250, 500);
      expect(transaction.getType()).toEqual("credit");
    });

    it("gets the transaction amount", function () {
      expect(transaction.getAmount).toBeDefined();
      expect(transaction.getAmount()).toEqual(250);
    });

    it("gets the updated balance after the transaction is executed", function () {
      expect(transaction.getBalance).toBeDefined();
      expect(transaction.getBalance()).toEqual(500);
    });
  });

  describe("Checking the transactipon type and updating the amount accordingly", function () {
    it("checks the transaction using the transactionCheck function", function () {
      expect(transaction.transactionCheck).toBeDefined();
    });

    it("Updates the debit transaction by adding || before the amount", function () {
      transaction.transactionCheck();
      expect(transaction.getAmount()).toEqual("|| 250");
    });

    it("Updates the debit transaction by adding || before the amount", function () {
      transaction = new Transaction("credit", 250, 500);
      transaction.transactionCheck();
      expect(transaction.getAmount()).toEqual("250 ||");
    });
  });
});