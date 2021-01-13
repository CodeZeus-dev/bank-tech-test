class Transaction {
  static transactions = [];

  constructor() {
    this.transactionDate;
  }

  recordTransaction(transactionType, amount, balance) {
    this.#getCurrentDate();
    this.#checkDateFormat();
    if (transactionType === "debit") {
      Transaction.transactions = [
        `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` +
        ` || || ${amount.toFixed(2)} || ${balance}`, ...Transaction.transactions
      ];
    } else if (transactionType === "credit") {
      Transaction.transactions = [
        `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` +
        ` || ${amount.toFixed(2)} || || ${balance}`, ...Transaction.transactions
      ];
    }  
  }

  requestTransactions() {
    if (!Transaction.transactions.includes("date || credit || debit || balance")) {
      Transaction.transactions = ["date || credit || debit || balance", ...Transaction.transactions];
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