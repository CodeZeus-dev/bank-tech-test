'use strict';

const TransactionDate = require('./TransactionDate');

class Transaction {
  static transactions = [];

  recordTransaction(transactionType, transAmount, transBalance) {
    let [month, day, year] = TransactionDate.getDate();
    Transaction.transactions = [
      {
        type: transactionType,
        date: `${day}/${month}/${year}`, 
        amount: transAmount.toFixed(2), 
        balance: transBalance
      },
      ...Transaction.transactions
    ];
  }

  requestTransactions() {
    return Transaction.transactions;
  }
}

module.exports = Transaction;