const Account = require('./Account');
const Transaction = require('./Transaction');

class BankTech {
  constructor(account = new Account(), transaction = new Transaction()) {
    this.account = account;
    this.transaction = transaction;
  }

  accountBalance() {
    return this.account.currentBalance();
  }

  deposit(amount) {
    this.transaction.recordTransaction(
      "debit", 
      amount, 
      this.accountBalance()
    );
    this.account.updateBalance("debit", amount);
  }

  withdraw(amount) {
    this.transaction.recordTransaction(
      "credit", 
      amount, 
      this.accountBalance()
    );
    this.account.updateBalance("credit", amount);
  }

  printAccountStatement() {
    return this.transaction.requestTransactions();
  }
}

module.exports = BankTech;
