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
})