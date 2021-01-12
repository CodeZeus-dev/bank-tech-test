class Transaction {
  static transactions = ["date || credit || debit || balance"];

  constructor() {
    this.transactionDate;
  }

  recordTransaction(transactionType, amount, balance) {
    this.#getCurrentDate();
    if (transactionType === "debit") {
      Transaction.transactions.push(
          `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` +
          ` || || ${amount.toFixed(2)} || ${balance}`
      )
    } else if (transactionType === "credit") {
      Transaction.transactions.push(
        `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` +
        ` || ${amount.toFixed(2)} || || ${balance}`
      )
    }  
  }

  requestTransactions() {
    Transaction.transactions.forEach((transaction) => {
      console.log(transaction)
    });
    if (process.env.NODE_ENV === "test") {
      return Transaction.transactions;
    }
  }

  #getCurrentDate() {
    this.transactionDate = new Date().toLocaleDateString("en-US").split("/");
  }
}

module.exports = Transaction;