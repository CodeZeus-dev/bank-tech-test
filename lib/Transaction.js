class Transaction {
  static transactions = [];

  constructor() {
    this.transactionDate;
  }

  recordTransaction(transactionType, amount, balance) {
    this.#getCurrentDate();
    this.#checkDateFormat();
    if (transactionType === "debit") {
      Transaction.transactions.unshift(
          `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` +
          ` || || ${amount.toFixed(2)} || ${balance}`
      )
    } else if (transactionType === "credit") {
      Transaction.transactions.unshift(
        `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` +
        ` || ${amount.toFixed(2)} || || ${balance}`
      )
    }  
  }

  requestTransactions() {
    if (!Transaction.transactions.includes("date || credit || debit || balance")) {
      Transaction.transactions.unshift("date || credit || debit || balance");
    }
    Transaction.transactions.forEach((transaction) => {
      console.log(transaction)
    });
    if (process.env.NODE_ENV === "test") {
      return Transaction.transactions
    }
  }

  #getCurrentDate() {
    this.transactionDate = new Date().toLocaleDateString("en-US").split("/");
  }

  #checkDateFormat() {
    if (this.transactionDate[0].length === 1) {
      this.transactionDate[0] = '0' + this.transactionDate[0];
    }
    if (this.transactionDate[1].length === 1) {
      this.transactionDate[1] = '0' + this.transactionDate[1];
    }
  }
}

module.exports = Transaction;