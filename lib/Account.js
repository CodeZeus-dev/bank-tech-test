const MIN_BALANCE = 0;

class Account {
  static get MIN_BALANCE() {
    return MIN_BALANCE;
  }

  constructor(balance = Account.MIN_BALANCE) {
    this.balance = balance;
  }

  currentBalance() {
    return this.balance;
  }

  updateBalance(transactionType, amount) {
    if (transactionType === "debit") {
      this.balance += amount;
    } else if (transactionType === "credit") {
      this.balance -= amount;
    }
  }
}

module.exports = Account;