'use strict';

const TransactionList = require('../lib/TransactionList');

describe('TransactionList', function () {
  let testTransactionList;
  const DEBIT_AMOUNT = 500;
  const CREDIT_AMOUNT = 100;
  const ACCOUNT_BALANCE = 250;

  beforeEach(() => {
    testTransactionList = new TransactionList();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2011, 12, 10));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    TransactionList.transactions = [];
  });

  describe("Recording Transactions Functionality", function () {
    it("records a transaction using the recordTransaction function", function () {
      expect(testTransactionList.recordTransaction).toBeDefined();
    });

    it("records a debit transaction", function () {
      testTransactionList.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE + DEBIT_AMOUNT);
      expect(JSON.stringify(TransactionList.transactions)).toEqual(JSON.stringify([{ 
        "transType": "debit", 
        "transAmount": 500, 
        "transBalance": 750, 
        "transDate": "10/01/2012"
      }]));
    });

    it("records a credit transaction", function () {
      testTransactionList.recordTransaction("credit", CREDIT_AMOUNT, ACCOUNT_BALANCE - CREDIT_AMOUNT);
      expect(JSON.stringify(TransactionList.transactions)).toEqual(JSON.stringify([{ 
        "transType": "credit", 
        "transAmount": 100, 
        "transBalance": 150, 
        "transDate": "10/01/2012"
      }]));
    });
  });

  describe("Request Transactions Functionality", function () {
    it("requests the Transactions History using the requestTransactions function", function () {
      expect(testTransactionList.requestTransactions).toBeDefined();
    });

    it("requests the list of transactions for the account statement", function () {
      testTransactionList.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE + DEBIT_AMOUNT);
      expect(testTransactionList.requestTransactions()).toEqual(
        "date || credit || debit || balance\n10/01/2012 || || 500 || 750"
      );
    });

    it("requests the list of transactions for the account statement for multiple dates", function () {
      testTransactionList.recordTransaction("debit", DEBIT_AMOUNT, DEBIT_AMOUNT);
      jasmine.clock().mockDate(new Date(2011, 12, 13));
      testTransactionList.recordTransaction("debit", DEBIT_AMOUNT, DEBIT_AMOUNT * 2);
      jasmine.clock().mockDate(new Date(2011, 12, 14));
      testTransactionList.recordTransaction("credit", ACCOUNT_BALANCE, DEBIT_AMOUNT * 2 - ACCOUNT_BALANCE);
      expect(testTransactionList.requestTransactions()).toEqual(
        'date || credit || debit || balance\n' +
        '14/01/2012 || 250 || || 750\n' +
        '13/01/2012 || || 500 || 1000\n' +
        '10/01/2012 || || 500 || 500'
      );
    });
  });
});

