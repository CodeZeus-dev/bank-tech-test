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
      draftStatememt = draftStatememt.concat(
        `\n${transaction.date} || ${transaction.amount} || ${transaction.balance}`
      );
    });
    return draftStatememt;
  }

  #transactionCheck(transaction) {
    if (transaction.type === "credit") {
      transaction.amount = transaction.amount + " ||";
    } else if (transaction.type === "debit") {
      transaction.amount =  "|| " + transaction.amount;
    }
    return transaction;
  }
}

module.exports = BankTech;
