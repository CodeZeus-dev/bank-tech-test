'use strict';

const TransactionDate = require('./TransactionDate');

class Transaction {
  constructor(transType, transAmount, transBalance) {
    this.transType = transType;
    this.transAmount = transAmount;
    this.transBalance = transBalance;
    // transDate :: using instance variable so that the date is set only upon initialisation
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

  getTransaction() {
    return ({
      type: this.transType,
      date: this.transDate, 
      amount: this.transAmount.toFixed(2), 
      balance: this.transBalance
    });
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