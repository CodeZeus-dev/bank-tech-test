'use strict';

const TransactionDate = require('./TransactionDate');

class Transaction {
  constructor(transType, transAmount, transBalance) {
    this.transType = transType;
    this.transAmount = transAmount;
    this.transBalance = transBalance;
    this.transDate = TransactionDate.getDate(); 
  }

  getDate() {
    return this.transDate;
  }

  getType() {
    return this.transType;
  }

  getAmount() {
    return this.transAmount;
  }

  getBalance() {
    return this.transBalance;
  }

  transactionCheck() {
    if (this.transType === "credit") {
      this.transAmount = this.transAmount + " ||";
    } else if (this.transType === "debit") {
      this.transAmount =  "|| " + this.transAmount;
    }
  }

}

module.exports = Transaction;