'use strict';

const Transaction = require('./Transaction');

class TransactionList {
  static transactions = [];

  recordTransaction(transactionType, transAmount, transBalance) {
    TransactionList.transactions = [ 
      new Transaction(transactionType, transAmount, transBalance),
      ...TransactionList.transactions
    ];
  }

  requestTransactions() {
    let draftStatememt = "date || credit || debit || balance";
    TransactionList.transactions.forEach((transaction) => {
      transaction.transactionCheck();
      draftStatememt = draftStatememt.concat(
        `\n${transaction.getDate()} || ${transaction.getAmount()} || ${transaction.getBalance()}`
      );
    });
    return draftStatememt;
  }
}

module.exports = TransactionList;