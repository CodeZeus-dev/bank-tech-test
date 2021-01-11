const BankTech = require('../../lib/BankTech');

describe('BankTech', function() {
    let bankTech;
    const DEPOSIT_AMOUNT = 500;
    const WITHDRAWAL_AMOUNT = 250;

    beforeEach(function() {
        bankTech = new BankTech();
        console.log = jasmine.createSpy("log");
    })

    describe("Tracking Balance", function() {
        it('creates a balance upon initialisation', function() {
            expect(bankTech.balance).toEqual(BankTech.MIN_BALANCE);
        });

        it('returns the current balance when currentBalance is called', function() {
            expect(bankTech.currentBalance).toBeDefined();
            expect(bankTech.currentBalance()).toEqual(BankTech.MIN_BALANCE);
        });
    })
    
    describe("Deposit Functionality", function() {
        it('uses the deposit function to deposit funds into the account', function() {
            expect(bankTech.deposit).toBeDefined();
        });

        it('enables a user to deposit money to account', function() {
            bankTech.deposit(DEPOSIT_AMOUNT);
            expect(bankTech.currentBalance()).toEqual(DEPOSIT_AMOUNT);
        });
    })

    describe("Withdrawal Functionality", function() {
        it('withdraws money from the account using the withdrawal function', function() {
            expect(bankTech.withdraw).toBeDefined();
        });

        it('uses the withdrawal function to withdraw funds from the account', function() {
            bankTech.deposit(DEPOSIT_AMOUNT);
            bankTech.withdraw(WITHDRAWAL_AMOUNT);
            expect(bankTech.currentBalance()).toEqual(DEPOSIT_AMOUNT - WITHDRAWAL_AMOUNT);
        });
    })

    describe("Account Statement Functionality", function() {
        it('creates a transaction history upon initialisation', function() {
            expect(bankTech.transactionHistory).toEqual({});
            expect(bankTech.printAccountStatement).toBeDefined();
        });

        it('creates an empty account statement upon initialisation', function() {
            expect(bankTech.accountStatement).toEqual("date || credit || debit || balance");
        });

        it('adds a deposit transaction to the transactions history', function() {
            bankTech.deposit(DEPOSIT_AMOUNT);
            expect(bankTech.printAccountStatement()).toEqual(
                'date || credit || debit || balance\n' + 
                '11/1/2021 || || 500.00 || 0'
            );
        });
        it('adds a withdrawal transaction to the transactions history', function() {
            bankTech.deposit(DEPOSIT_AMOUNT);
            bankTech.withdraw(WITHDRAWAL_AMOUNT);
            expect(bankTech.printAccountStatement()).toEqual(
                'date || credit || debit || balance\n' + 
                '11/1/2021 || || 500.00 || 0\n' +
                '11/1/2021 || 250.00 || || 500'
            );
        });
    })
})