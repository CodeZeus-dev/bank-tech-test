'use strict';

const Transaction = require('../lib/Transaction');

describe('Transaction', function () {
  let testTransaction;
  const DEBIT_AMOUNT = 500;
  const CREDIT_AMOUNT = 100;
  const ACCOUNT_BALANCE = 250;

  beforeEach(() => {
    testTransaction = new Transaction();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2011, 12, 10));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    Transaction.transactions = [];
  });

  describe("Recording Transactions Functionality", function () {
    it("records a transaction using the recordTransaction function", function () {
      expect(testTransaction.recordTransaction).toBeDefined();
    });

    it("records a debit transaction", function () {
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE + DEBIT_AMOUNT);
      expect(Transaction.transactions).toContain({
        type: "debit", 
        date: '10/01/2012', 
        amount: '500.00', 
        balance: 750
      });
    });

    it("records a credit transaction", function () {
      testTransaction.recordTransaction("credit", CREDIT_AMOUNT, ACCOUNT_BALANCE - CREDIT_AMOUNT);
      expect(Transaction.transactions).toContain({
        type: "credit", 
        date: '10/01/2012', 
        amount: '100.00', 
        balance: 150
      });
    });
  });

  describe("Request Transactions Functionality", function () {
    it("requests the Transactions History using the requestTransactions function", function () {
      expect(testTransaction.requestTransactions).toBeDefined();
    });

    it("requests the list of transactions for the account statement", function () {
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE + DEBIT_AMOUNT);
      expect(JSON.stringify(testTransaction.requestTransactions())).toEqual(JSON.stringify([{
        type: "debit", 
        date: '10/01/2012', 
        amount: '500.00', 
        balance: 750
      }]));
    });

    it("requests the list of transactions for the account statement for multiple dates", function () {
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, DEBIT_AMOUNT);
      jasmine.clock().mockDate(new Date(2011, 12, 13));
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, DEBIT_AMOUNT * 2);
      jasmine.clock().mockDate(new Date(2011, 12, 14));
      testTransaction.recordTransaction("credit", ACCOUNT_BALANCE, DEBIT_AMOUNT * 2 - ACCOUNT_BALANCE);
      expect(testTransaction.requestTransactions()).toEqual([
        {
          type: "credit", 
          date: '14/01/2012', 
          amount: '250.00', 
          balance: 750
        },
        {
          type: "debit", 
          date: '13/01/2012', 
          amount: '500.00', 
          balance: 1000
        },
        {
          type: "debit", 
          date: '10/01/2012', 
          amount: '500.00', 
          balance: 500
        }
      ]);
    });
  });
});

