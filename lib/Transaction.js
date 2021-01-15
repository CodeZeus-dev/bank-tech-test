'use strict';

const TransactionDate = require('./TransactionDate');

class Transaction {
  static transactions = [];

  recordTransaction(transactionType, amount, balance) {
    let [month, day, year] = TransactionDate.getDate();
    Transaction.transactions = [
      [
        transactionType,
        `${day}/${month}/${year}`, 
        amount.toFixed(2), 
        balance
      ],
      ...Transaction.transactions
    ];
  }

  requestTransactions() {
    return Transaction.transactions;
  }
}

module.exports = Transaction;