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
    this.account.updateBalance("debit", amount);
    this.transaction.recordTransaction(
      "debit", 
      amount, 
      this.accountBalance()
    );
  }

  withdraw(amount) {
    this.account.updateBalance("credit", amount);
    this.transaction.recordTransaction(
      "credit", 
      amount, 
      this.accountBalance()
    );
  }

  printAccountStatement() {
    return this.transaction.requestTransactions();
  }
}

module.exports = BankTech;
