const Account = require('../lib/Account');

describe("Account", function () {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account();
  });

  describe("Tracking Balance", function () {
    it("creates a balance upon initialisation", function () {
      expect(testAccount.balance).toEqual(Account.MIN_BALANCE);
    });

    it("returns the current balance when currentBalance is called", function () {
      expect(testAccount.currentBalance).toBeDefined();
      expect(testAccount.currentBalance()).toEqual(Account.MIN_BALANCE);
    });
  });

  describe("Functionality to update the balance", function () {
    it("increases the current balance by the specified amount if debit transaction", function () {
      expect(testAccount.currentBalance()).toEqual(0);
      testAccount.updateBalance("debit", 50);
      expect(testAccount.currentBalance()).toEqual(50);
    });

    it("subtracts the specified amount from the current balance if credit transaction", function () {
      expect(testAccount.currentBalance()).toEqual(0);
      testAccount.updateBalance("debit", 50);
      expect(testAccount.currentBalance()).toEqual(50);
      testAccount.updateBalance("credit", 15);
      expect(testAccount.currentBalance()).toEqual(35);
    });
  });
})