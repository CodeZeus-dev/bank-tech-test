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

<hr>

## Planning & Structure

The following Class Diagram depicts the project structure based on the initial planning and OOP design.

<img width="594" alt="Screenshot 2021-01-12 at 19 10 15" src="https://user-images.githubusercontent.com/65397514/104347992-e598e000-5509-11eb-8fb9-af3aeaf79bdd.png">

The BankTech class creates the interface with which the user interacts, and it depends on the Account and Transaction class from which it extracts information on the account's balance and the transaction history. The BankTech class enables the user to deposit, withdraw and print their account's Statement.

## How to use the app

Clone the current repository

```bash
$ git clone https://github.com/CodeZeus-dev/bank-tech-test.git
```

Go to the root directory of your cloned local repo and install all necessary Node packages

```bash
$ npm install
```

Run Node

```bash
$ node
```

Require the file containing the BankTech class

```bash
$ const Bank = require('./lib/BankTech');
```

Create an instance of the Bank Class

```bash
const atm = new Bank();
```

#### To deposit an amount (e.g. $500)

```bash
$ atm.deposit(500);
```
#### To withdraw an amount (e.g. $250)

```bash
$ atm.withdraw(250);
```

#### To check the current balance

```bash
$ atm.currentBalance();
```

#### To print the Account Statement

```bash
$ atm.printAccountStatement();
```

## How to run the tests

To run the tests for the current project, execute the following command in the terminal,

```bash
$ jasmine
```

To include the code/test coverage in the tests, run the following,

```bash
$ npm test
```
