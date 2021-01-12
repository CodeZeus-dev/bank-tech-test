const BankTech = require("../lib/BankTech");

describe("BankTech", function () {
  let bankTech;
  const DEPOSIT_AMOUNT = 500;
  const WITHDRAWAL_AMOUNT = 250;
  let transactionDate;

  beforeEach(function () {
    bankTech = new BankTech();
    process.env.NODE_ENV = "test";
    transactionDate = new Date().toLocaleDateString("en-US").split("/");
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  describe("Tracking Balance", function () {
    it("creates a balance upon initialisation", function () {
      expect(bankTech.balance).toEqual(BankTech.MIN_BALANCE);
    });

    it("returns the current balance when currentBalance is called", function () {
      expect(bankTech.currentBalance).toBeDefined();
      expect(bankTech.currentBalance()).toEqual(BankTech.MIN_BALANCE);
    });
  });

  describe("Deposit Functionality", function () {
    it("uses the deposit function to deposit funds into the account", function () {
      expect(bankTech.deposit).toBeDefined();
    });

    it("enables a user to deposit money to account", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      expect(bankTech.currentBalance()).toEqual(DEPOSIT_AMOUNT);
    });
  });

  describe("Withdrawal Functionality", function () {
    it("withdraws money from the account using the withdrawal function", function () {
      expect(bankTech.withdraw).toBeDefined();
    });

    it("uses the withdrawal function to withdraw funds from the account", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.currentBalance()).toEqual(
        DEPOSIT_AMOUNT - WITHDRAWAL_AMOUNT
      );
    });
  });

  describe("Account Statement Functionality", function () {
    it("creates an empty account statement upon initialisation", function () {
      expect(bankTech.printAccountStatement).toBeDefined();
      expect(bankTech.accountStatement).toEqual(
        "date || credit || debit || balance"
      );
    });

    it("adds a deposit transaction to the transactions history", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      expect(bankTech.accountStatement).toEqual(
        "date || credit || debit || balance\n" +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 0`
      );
    });

    it("adds a withdrawal transaction to the transactions history", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.accountStatement).toEqual(
        "date || credit || debit || balance\n" +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 0\n` +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 250.00 || || 500`
      );
    });

    it("returns the account Statement to the user", function () {
      bankTech.deposit(DEPOSIT_AMOUNT);
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.printAccountStatement()).toBe(
        "date || credit || debit || balance\n" +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || || 500.00 || 0\n` +
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 250.00 || || 500`
      );
    });
  });
});
