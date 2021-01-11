const BankTech = require('../../lib/BankTech');

describe('BankTech', function() {
    let bankTech;
    const DEPOSIT_AMOUNT = 500;

    beforeEach(function() {
        bankTech = new BankTech();
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
})