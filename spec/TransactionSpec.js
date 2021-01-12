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
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  describe("Recording Transactions Functionality", function () {
    it("records a transaction using the recordTransaction function", function () {
      expect(testTransaction.recordTransaction).toBeDefined();
    });

    it("records a debit transaction", function () {
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE);
      expect(Transaction.transactions).toContain(
        `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 250`
      );
    });

    it("records a credit transaction", function () {
      testTransaction.recordTransaction("credit", CREDIT_AMOUNT, ACCOUNT_BALANCE);
      expect(Transaction.transactions).toContain(
        `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 100.00 || || 250`
      );
    });
  });

  describe("Request Transactions Functionality", function () {
    it("requests the Transactions History using the requestTransactions function", function () {
      expect(testTransaction.requestTransactions).toBeDefined();
    });

    it("requests the list of transactions for the account statement", function () {
      Transaction.transactions = ["date || credit || debit || balance"];
      testTransaction.recordTransaction("debit", DEBIT_AMOUNT, ACCOUNT_BALANCE);
      expect(JSON.stringify(testTransaction.requestTransactions())).toEqual(JSON.stringify([
        "date || credit || debit || balance",
        `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 250`
      ]));
    });
  });
});

