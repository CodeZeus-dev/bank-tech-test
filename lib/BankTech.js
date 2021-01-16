'use strict';

const Account = require('./Account');
const TransactionList = require('./TransactionList');
const Transaction = require('./Transaction');

class BankTech {
  constructor(account = new Account(), transactionList = new TransactionList()) {
    this.account = account;
    this.transactionList = transactionList;
  }

  accountBalance() {
    return this.account.currentBalance();
  }

  deposit(amount) {
    this.account.updateBalance("debit", amount);
    this.transactionList.recordTransaction(
      "debit", 
      amount, 
      this.accountBalance()
    );
  }

  withdraw(amount) {
    this.account.updateBalance("credit", amount);
    this.transactionList.recordTransaction(
      "credit", 
      amount, 
      this.accountBalance()
    );
  }

  printAccountStatement() {
    let statement = this.transactionList.requestTransactions();
    console.log(statement);    
  }
}

module.exports = BankTech;
