const BankTech = require('../../lib/BankTech');

describe('BankTech', function() {
    let bankTech;
    const DEPOSIT_AMOUNT = 500;
    const WITHDRAWAL_AMOUNT = 250;

    beforeEach(function() {
        bankTech = new BankTech();
        // bankTech.balance = 0;
    })

    describe("Tracking Balance", function() {
        it('creates a balance upon initialisation', function() {
            expect(bankTech.balance).toEqual(0);
        });

        it('returns the current balance when currentBalance is called', function() {
            expect(bankTech.currentBalance()).toBeDefined();
            expect(bankTech.currentBalance()).toEqual(0);
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
        it('uses the withdrawal function to withdraw funds from the account', function() {
            bankTech.deposit(DEPOSIT_AMOUNT);
            bankTech.withdraw(WITHDRAWAL_AMOUNT);
            expect(bankTech.currentBalance()).toEqual(DEPOSIT_AMOUNT - WITHDRAWAL_AMOUNT);
        })
    })
})