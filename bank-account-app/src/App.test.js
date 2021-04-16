import { render, screen } from "@testing-library/react";
import App from "./App";
import { BankAccount, ValueError } from "./BankAccount";
import { BankInstitution } from "./BankInstitution";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Bank Account", () => {
  test("newly opened account has zero balance", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    expect(account.balance).toEqual(0);
  });

  test("can deposit money", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(100);
    expect(account.balance).toEqual(100);
  });

  test("can deposit money sequentially", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(100);
    account.deposit(50);
    expect(account.balance).toEqual(150);
  });

  test("can withdraw money", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(100);
    account.withdraw(50);
    expect(account.balance).toEqual(50);
  });

  test("can withdraw money sequentially", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(100);
    account.withdraw(20);
    account.withdraw(80);
    expect(account.balance).toEqual(0);
  });

  test("checking balance of closed account throws error", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.close();
    expect(() => account.balance).toThrow(ValueError);
  });

  test("deposit into closed account throws error", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.close();
    expect(() => {
      account.deposit(50);
    }).toThrow(ValueError);
  });

  test("withdraw from closed account throws error", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.close();
    expect(() => {
      account.withdraw(50);
    }).toThrow(ValueError);
  });

  test("close already closed account throws error", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    expect(() => {
      account.close();
    }).toThrow(ValueError);
  });

  test("open already opened account throws error", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    expect(() => {
      account.open();
    }).toThrow(ValueError);
  });

  test("reopened account does not retain balance", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(50);
    account.close();
    account.open();
    expect(account.balance).toEqual(0);
  });

  test("cannot withdraw more than deposited", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(25);
    expect(() => {
      account.withdraw(50);
    }).toThrow(ValueError);
  });

  test("cannot withdraw negative amount", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(100);
    expect(() => {
      account.withdraw(-50);
    }).toThrow(ValueError);
  });

  test("cannot deposit negative amount", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    expect(() => {
      account.deposit(-50);
    }).toThrow(ValueError);
  });

  test("list transaction history", () => {
    const account = new BankAccount(function (transactionType, amount) {});
    account.open();
    account.deposit(50);
    account.withdraw(25);
    account.getTransactionHistory();
    /* Expect list of transaction objects
    type, amount, date
    [{transactionType: "deposit", amount: 50, date: "2021-04-13"}]*/
    expect(account.getTransactionHistory()).toEqual([
      {
        transactionType: "deposit",
        amount: 50,
        date: new Date().toISOString().substr(0, 10),
      },
      {
        transactionType: "withdraw",
        amount: 25,
        date: new Date().toISOString().substr(0, 10),
      },
    ]);
  });
});

describe("Bank Institution", () => {
  /* tests: create a bank
            open an account 
            close an account
            get an account
            list accounts
            return total money in all accounts
            loaning money to an account
            list all current loans
            pay back a loan*****
            transferring money between accounts (stretch goal)
    */
  test("create bank", () => {
    const stileBank = new BankInstitution("Stile Bank");
    // should make this check getters instead?
    // nope, don't need to, this works fine
    expect(stileBank).toEqual({
      name: "Stile Bank",
      accounts: {},
      loans: [],
      runningTotal: 0,
    });
  });

  test("make account", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    let testAccount = stileBank.accounts[testID];
    expect(() => {
      //when u wanna check for an error, wrap it in a function
      testAccount.balance;
    }).toThrow(ValueError);
    expect(testAccount._open).toEqual(undefined);
    expect(testAccount._transactionHistory).toEqual([]);
    /*
    expect(stileBank.accounts).toEqual({
      [testID]: {
        _open: undefined,
        _balance: undefined,
        _transactionHistory: [],
        _updateBankInstitutionTotalBalance: "hilfe",
      },
    });*/ // use square brackets to use the content of a variable as an object key
  });

  test("open an account", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount(); // should create a new account object in the accounts object and return the randomly generated ID
    stileBank.openAccount(testID); // should call the accounts open method
    stileBank.getAccount(testID).isActive(); // should get the given account to return whether it is active
    expect(stileBank.getAccount(testID).isActive()).toEqual(true);
  });

  test("close an account", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount(); //generates the new bank acc into existence -> calls on the constructor class in bankacc.js
    stileBank.openAccount(testID); //opens the newly generated account and makes it active
    stileBank.closeAccount(testID); //closes the acc
    stileBank.getAccount(testID).isActive(); //retrieves the acc object (all its properties included) and checks if account is active (one of the properties)
    expect(stileBank.getAccount(testID).isActive()).toEqual(false);
  });

  test("get an account", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    let testAccount = stileBank.getAccount(testID);
    //account.getBalance() // use getters to test for
    expect(() => {
      //when u wanna check for an error, wrap it in a function
      testAccount.balance;
    }).toThrow(ValueError);
    expect(testAccount._open).toEqual(undefined);
    expect(testAccount._transactionHistory).toEqual([]); //have only created the object, havent opened it or assigned it any balances etc, therefore shld return undef
  });

  test("list accounts", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    let obj = stileBank.listAccounts();
    let cloneoObj = {};
    for (let key in obj) {
      delete obj[key]["_updateBankInstitutionTotalBalance"];
      cloneoObj[key] = obj[key];
    }
    expect(cloneoObj).toEqual({
      [testID]: {
        _balance: undefined,
        _open: undefined,
        _transactionHistory: [],
      },
    }); // id number = the entire generic account object with no values assigned
  });

  /*
  test("list accounts", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    let listedAccounts = stileBank.listAccounts();
    console.log("Original List", listedAccounts);
    // {[testID]: {_balance: undefined, _open: undefined, _transactionHistory: []}}
    listedAccounts["dog"] = 1;
    // {[testID]: {_balance: undefined, _open: undefined, _transactionHistory: []}, "dog": 1}
    console.log("With Dog", listedAccounts);

    listedAccounts[testID]["_transactionHistory"] = ["maccas"];
    console.log("calling it again", stileBank.listAccounts());
    // {[testID]: {_balance: undefined, _open: undefined, _transactionHistory: []}, "dog": 1}
  });
  */

  test("return total money in all accounts", () => {
    //programming return not normie return
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    stileBank.openAccount(testID);
    stileBank.getAccount(testID).deposit(50); //have to get the specific acc to deposit into
    let testID2 = stileBank.makeAccount();
    stileBank.openAccount(testID2);
    stileBank.getAccount(testID2).deposit(33);
    expect(stileBank.getAccount(testID).balance).toEqual(50);
    expect(stileBank.getAccount(testID2).balance).toEqual(33);
    expect(stileBank.accountTotal()).toEqual(83);
  });

  test("loaning money", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    stileBank.openAccount(testID);
    stileBank.loanMoney(testID, 500); //give a loan to (id of bank acc) and put in 500
    expect(stileBank.getAccount(testID).balance).toEqual(500); //dont use 'get' when retrieving the balance of an acc & balance doesnt have a parameter
  });

  test("list all current loans", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    stileBank.openAccount(testID);
    stileBank.loanMoney(testID, 230);
    expect(stileBank.listLoans()).toEqual([
      { amountOwed: 230, moneyOwing: true, accountID: testID },
    ]); //put object in array to allow for multiple loans to be listed
  });

  test("transferring money between accounts", () => {
    const stileBank = new BankInstitution("Stile Bank");
    let testID = stileBank.makeAccount();
    stileBank.openAccount(testID);
    stileBank.getAccount(testID).deposit(500);
    let testID2 = stileBank.makeAccount();
    stileBank.openAccount(testID2);
    stileBank.getAccount(testID2).deposit(200);
    stileBank.transfer(testID, testID2, 100);
    expect(stileBank.getAccount(testID).balance).toEqual(400);
    expect(stileBank.getAccount(testID2).balance).toEqual(300);
  });
});
