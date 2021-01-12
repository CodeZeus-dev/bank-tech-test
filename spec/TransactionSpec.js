const Transaction = require('../lib/Transaction');

describe('Transaction', function () {
  let testTransaction;
  const DEBIT_AMOUNT = 500;
  const CREDIT_AMOUNT = 100;
  const ACCOUNT_BALANCE = 250;

  beforeEach(() => {
    process.env.NODE_ENV = "test";
    testTransaction = new Transaction();
    transactionDate = new Date().toLocaleDateString("en-US").split("/");
    if (transactionDate[0].length === 1) {
      transactionDate[0] = '0' + transactionDate[0];
    }
    if (transactionDate[1].length === 1) {
      transactionDate[1] = '0' + transactionDate[1];
    }
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
    Transaction.transactions = [];
  });

  describe("Recording Transactions Functionality", function () {
    it("records a transaction using the recordTransaction function", function () {
      expect(testTransaction.recordTransaction).toBeDefined();
    });

    it("records a debit transaction", function () {
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE + DEBIT_AMOUNT);
      expect(Transaction.transactions).toContain(
        `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 750`
      );
    });

    it("records a credit transaction", function () {
      testTransaction.recordTransaction("credit", CREDIT_AMOUNT, ACCOUNT_BALANCE - CREDIT_AMOUNT);
      expect(Transaction.transactions).toContain(
        `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 100.00 || || 150`
      );
    });
  });

  describe("Request Transactions Functionality", function () {
    it("requests the Transactions History using the requestTransactions function", function () {
      expect(testTransaction.requestTransactions).toBeDefined();
    });

    it("requests the list of transactions for the account statement", function () {
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE + DEBIT_AMOUNT);
      expect(JSON.stringify(testTransaction.requestTransactions())).toEqual(JSON.stringify([
        "date || credit || debit || balance",
        `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 750`
      ]));
    });
  });
});

