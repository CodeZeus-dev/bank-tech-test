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
    // Print Body
    let transactions = this.transaction.requestTransactions();
    if (process.env.NODE_ENV === "test") {
      return transactions;
    }
    // Print Header
    console.log("date || credit || debit || balance");
    transactions.forEach((transaction) => {
      if (transaction[0] === "credit") {
        transaction[2] = transaction[2] + " ||";
        console.log(transaction.slice(1, 4).join(" || "));
      } else if (transaction[0] === "debit") {
        transaction[2] =  "|| " + transaction[2];
        console.log(transaction.slice(1, 4).join(" || "));
      }
    });
  }
}

module.exports = BankTech;
