const BankTech = require('../../lib/BankTech');

describe('BankTech', function() {
    let bankTech;

    beforeEach(function() {
        bankTech = new BankTech();
    })

    it('creates a balance upon initialisation', function() {
        expect(bankTech.balance).toEqual(0);
    });

    // describe("Deposit Functionality", function() {
    //     it('enables a user to deposit money to account', function() {
        
    //     })
    // })
})