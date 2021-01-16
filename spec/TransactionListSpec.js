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
      expect(transaction.getDate()).toEqual(['11', '05', '2012']);
    });

    it("gets the transaction type (debit)", function () {
      expect(transaction.getType()).toEqual("debit");
    });

    it("gets the transaction type (credit)", function () {
      transaction = new Transaction("credit", 250, 500);
      expect(transaction.getType()).toEqual("credit");
    });

    it("gets the transaction amount", function () {
      expect(transaction.getAmount()).toEqual(250);
    });

    it("gets the updated balance after the transaction is executed", function () {
      expect(transaction.getBalance()).toEqual(500);
    });
  });

  describe("Getting the Transaction", function () {
    it("returns the transaction in the form of an object (debit)", function () {
      expect(transaction.getTransaction()).toEqual({
        type: "debit",
        date: ['11', '05', '2012'],
        amount: '250.00',
        balance: 500
      });
    });

    it("returns the transaction in the form of an object (credit)", function () {
      transaction = new Transaction("credit", 250, 500);
      expect(transaction.getTransaction()).toEqual({
        type: "credit",
        date: ['11', '05', '2012'],
        amount: '250.00',
        balance: 500
      });
    });
  });

  describe("Checking the transactipon type and updating the amount accordingly", function () {
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