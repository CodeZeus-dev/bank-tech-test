const BankTech = require("../lib/BankTech");
const Transaction = require("../lib/Transaction");

describe("BankTech", function () {
  let bankTech;
  const MIN_BALANCE = 0;
  const DEPOSIT_AMOUNT = 500;
  const WITHDRAWAL_AMOUNT = 250;
  let transactionDate;

  let account = {
    balance: 0
  };

  account.currentBalance = function () {
    return account.balance;
  };

  account.updateBalance = function (type, amount) {
    if (type === "debit") {
        account.balance += amount;
    } else if (type === "credit") {
      account.balance -= amount;
    }
  };

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

    it("prints the account statement with transactions on multiple dates", function () {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(2011, 12, 10));
      bankTech.deposit(DEPOSIT_AMOUNT);
      jasmine.clock().mockDate(new Date(2011, 12, 13));
      bankTech.deposit(DEPOSIT_AMOUNT);
      jasmine.clock().mockDate(new Date(2011, 12, 14));
      bankTech.withdraw(WITHDRAWAL_AMOUNT);
      expect(bankTech.printAccountStatement().join()).toEqual(
        "date || credit || debit || balance," +
          `10/01/2012 || || 500.00 || 0,` +
          `13/01/2012 || || 500.00 || 500,` +
          `14/01/2012 || || 500.00 || 0,`
          `${transactionDate[1]}/${transactionDate[0]}/${transactionDate[2]} || 250.00 || || 500`
      );
    });
  });
});
