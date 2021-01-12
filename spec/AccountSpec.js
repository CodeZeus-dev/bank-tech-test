const Account = require('../lib/Account');

describe("Account", function () {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account();
  });

  it("creates a balance upon initialisation", function () {
    expect(testAccount.balance).toEqual(Account.MIN_BALANCE);
  });
})