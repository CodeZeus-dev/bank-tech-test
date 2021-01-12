const BankTech = require("../lib/BankTech");

describe("BankTech", function () {
  /* Constants */ 
  const MIN_BALANCE = 0;
  const DEPOSIT_AMOUNT = 500;
  const WITHDRAWAL_AMOUNT = 250;

  /* Variables and instances of classes and mocks */
  let bankTech;
  let transactionDate;
  let account = require("./mocks/accountMock");
  let transaction = require("./mocks/transactionMock");

  beforeEach(function () {
    bankTech = new BankTech(account, transaction);
    process.env.NODE_ENV = "test";
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
    transaction.transactions = [];
    account.balance = MIN_BALANCE;
  });

  describe("Tracking Balance", function () {
    it("returns the current balance when accountBalance is called", function () {
      spyOn(account, "currentBalance").and.returnValue(MIN_BALANCE);
      expect(bankTech.accountBalance).toBeDefined();
      expect(bankTech.accountBalance()).toEqual(MIN_BALANCE);
    });
  });

  describe("Deposit Functionality", function () {
    it("uses the deposit function to deposit funds into the account", function () {
      expect(bankTech.deposit).toBeDefined();
    });

    it("enables a user to deposit money to account", function () {
      spyOn(account, "currentBalance").and.returnValue(DEPOSIT_AMOUNT);
      bankTech.deposit(DEPOSIT_AMOUNT);
      expect(bankTech.accountBalance()).toEqual(DEPOSIT_AMOUNT);
    });
  });

  describe("Withdrawal Functionality", function () {
    it("withdraws money from the account using the withdrawal function", function () {
      expect(bankTech.withdraw).toBeDefined();
    });

    it("uses the withdrawal function to withdraw funds from the account", function () {
      spyOn(account, "currentBalance").and.returnValue(DEPOSIT_AMOUNT - WITHDRAWAL_AMOUNT);
      bankTech.deposit(DEPOSIT_AMOUNT);
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.accountBalance()).toEqual(
        DEPOSIT_AMOUNT - WITHDRAWAL_AMOUNT
      );
    });
  });

  describe("Account Statement Functionality", function () {
    it("prints the account statement using the printAccountStatement function", function () {
      expect(bankTech.printAccountStatement).toBeDefined();
    });

    it("adds a deposit transaction to the transactions history", function () {
      spyOn(transaction, "requestTransactions").and.returnValue(
        "date || credit || debit || balance," +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 500`
      )
      bankTech.deposit(DEPOSIT_AMOUNT);
      expect(bankTech.printAccountStatement()).toEqual(
        "date || credit || debit || balance," +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 500`
      );
    });

    it("adds a withdrawal transaction to the transactions history", function () {
      spyOn(transaction, "requestTransactions").and.returnValue(
        "date || credit || debit || balance," +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 250.00 || || 250,` +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 500`
      )
      bankTech.deposit(DEPOSIT_AMOUNT);
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.printAccountStatement()).toEqual(
        "date || credit || debit || balance," +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 250.00 || || 250,` +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 500`
      );
    });

    it("prints the account statement with transactions on multiple dates", function () {
      spyOn(transaction, "requestTransactions").and.returnValue(
        "date || credit || debit || balance," +
          `14/01/2012 || 250.00 || || 750,` +
          `13/01/2012 || || 500.00 || 1000,` +
          `10/01/2012 || || 500.00 || 500`
      )
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(2011, 12, 10));
      bankTech.deposit(DEPOSIT_AMOUNT);
      jasmine.clock().mockDate(new Date(2011, 12, 13));
      bankTech.deposit(DEPOSIT_AMOUNT);
      jasmine.clock().mockDate(new Date(2011, 12, 14));
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.printAccountStatement()).toEqual(
        "date || credit || debit || balance," +
          `14/01/2012 || 250.00 || || 750,` +
          `13/01/2012 || || 500.00 || 1000,` +
          `10/01/2012 || || 500.00 || 500`                   
      );
    });
  });
});
