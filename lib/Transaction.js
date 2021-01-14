class Transaction {
  static transactions = [];

  constructor() {
    this.transactionDate;
  }

  recordTransaction(transactionType, amount, balance) {
    this.#getCurrentDate();
    this.#checkDateFormat();
    Transaction.transactions = [
      [
        transactionType,
        `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}`,
        amount.toFixed(2),
        balance
      ],
      ...Transaction.transactions
    ];
  }

  requestTransactions() {
    return Transaction.transactions;
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