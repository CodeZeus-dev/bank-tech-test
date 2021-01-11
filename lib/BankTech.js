class BankTech {
    constructor() {
        this.balance = 0;
    }

    currentBalance() {
        return this.balance;
    }

    deposit(amount) {
        this.balance += amount;
    }
}

module.exports = BankTech;