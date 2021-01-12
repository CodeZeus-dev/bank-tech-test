const BankTech = require("../lib/BankTech");
const Transaction = require("../lib/Transaction");

describe("BankTech", function () {
  let bankTech;
  const MIN_BALANCE = 0;
  const DEPOSIT_AMOUNT = 500;
  const WITHDRAWAL_AMOUNT = 250;
  let transactionDate;

  beforeEach(function () {
    bankTech = new BankTech();
    process.env.NODE_ENV = "test";
    Transaction.transactions = ["date || credit || debit || balance"];
    transactionDate = new Date().toLocaleDateString("en-US").split("/");
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  describe("Tracking Balance", function () {
    it("returns the current balance when accountBalance is called", function () {
      expect(bankTech.accountBalance).toBeDefined();
      expect(bankTech.accountBalance()).toEqual(MIN_BALANCE);
    });
  });

  describe("Deposit Functionality", function () {
    it("uses the deposit function to deposit funds into the account", function () {
      expect(bankTech.deposit).toBeDefined();
    });

    it("enables a user to deposit money to account", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      expect(bankTech.accountBalance()).toEqual(DEPOSIT_AMOUNT);
    });
  });

  describe("Withdrawal Functionality", function () {
    it("withdraws money from the account using the withdrawal function", function () {
      expect(bankTech.withdraw).toBeDefined();
    });

    it("uses the withdrawal function to withdraw funds from the account", function () {
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
      bankTech.deposit(DEPOSIT_AMOUNT);
      expect(bankTech.printAccountStatement().join()).toEqual(
        "date || credit || debit || balance," +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 0`
      );
    });

    it("adds a withdrawal transaction to the transactions history", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.printAccountStatement().join()).toEqual(
        "date || credit || debit || balance," +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 0,` +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 250.00 || || 500`
      );
    });

    it("returns the account Statement to the user for various transaction dates", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.printAccountStatement().join()).toBe(
        "date || credit || debit || balance," +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 0,` +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 250.00 || || 500`
      );
    });
  });
});
