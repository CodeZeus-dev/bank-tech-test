'use strict';

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
    let statement = this.#acquireTransactions();
    console.log(statement);    
  }

  #acquireTransactions() {
    let transactions = this.transaction.requestTransactions();
    let draftStatememt = "date || credit || debit || balance";
    transactions.forEach((transaction) => {
      transaction = this.#transactionCheck(transaction);
      draftStatememt = draftStatememt.concat(`\n${transaction.slice(1, 4).join(" || ")}`);
    });
    return draftStatememt;
  }

  #transactionCheck(transaction) {
    if (transaction[0] === "credit") {
      transaction[2] = transaction[2] + " ||";
    } else if (transaction[0] === "debit") {
      transaction[2] =  "|| " + transaction[2];
    }
    return transaction;
  }
}

module.exports = BankTech;
