# Bank Tech Test

In this project, the goal is to develop a banking deposit/withdrawal/statement console app using OOP and TDD best practices, making sure that the code meets the high quality standards at all times.

<hr> 

## Project Requirements

### Technical Requirements

1. The app's UI is Node's Console that prints messages to stdout and stderr;
2. No database is used but instead all data are kept in-memory.
3. The test coverage should be > 95%

### Acceptance Criteria

- Given a client makes a deposit of 1000 on 10-01-2012
- And a deposit of 2000 on 13-01-2012
- And a withdrawal of 500 on 14-01-2012
- When she prints her bank statement

Then she would see:

```bash
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```

<hr>

## User Stories

Deposit Feature

> As a customer of the bank,
> <br> So that I can add funds to my account,
> <br> I want to be able to deposit money.

Withdrawal Feature

> As a customer of the bank,
> <br> So that I can take money out of my account,
> <br> I want to be able to withdraw funds.

Account Statement Feature

> As a customer of the bank,
> <br> So that I can keep track of my balance and transactions,
> <br> I want to be able to print my account statement.

