const MIN_BALANCE = 0;

class BankTech {
    static get MIN_BALANCE() {
        return MIN_BALANCE;
    }

    constructor(balance = BankTech.MIN_BALANCE) {
        this.balance = balance;
        this.accountStatement = "date || credit || debit || balance";
        this.transactionDate;
    }

    currentBalance() {
        return this.balance;
    }

    deposit(amount) {
        this._getCurrentDate();
        this._recordDeposit(amount);
        this.balance += amount;
    }

    withdraw(amount) {
        this._getCurrentDate();
        this._recordWithdrawal(amount);
        this.balance -= amount;
    }

    printAccountStatement() {
        let aSA = this.accountStatement.split('\n');
        aSA.forEach((transaction) => {
            console.log(transaction);
        })
        if (process.env.NODE_ENV === 'test') {
            return this.accountStatement;
        }
        
    }

    _getCurrentDate() {
        this.transactionDate = new Date().toLocaleDateString("en-US").split("/");
    }

    _recordDeposit(amount) {
        this.accountStatement = this.accountStatement.concat(
            '\n' + 
            `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` + 
            ` || || ${amount.toFixed(2)} || ${this.balance}`
        );
    }

    _recordWithdrawal(amount) {
        this.accountStatement = this.accountStatement.concat(
            '\n' + 
            `${this.transactionDate[1]}/${this.transactionDate[0]}/${this.transactionDate[2]}` + 
            ` || ${amount.toFixed(2)} || || ${this.balance}`
        );
    }
}

module.exports = BankTech;