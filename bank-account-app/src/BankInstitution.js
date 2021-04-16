import { BankAccount } from "./BankAccount";
import { ID } from "./idGenerator";
import deepClone from "deep-clone";

export class BankInstitution {
  constructor(name) {
    this.name = name;
    this.accounts = {}; // think of this object like a dictionary
    this.loans = [];
    this.runningTotal = 0;
  }

  makeAccount() {
    // let account = new BankAccount();
    let accID = ID();
    this.accounts[accID] = new BankAccount(
      this.updateTotalAccountBalance.bind(this)
    );
    return accID;
  }

  openAccount(accID) {
    let accountObject = this.accounts[accID]; //accounts[accID] is the key in object -> store its value (acc obj) in the acc object variable
    accountObject.open(); //make sure to write an error & write a test to see when opening acc that doesnt exist
  }

  getAccount(accID) {
    return this.accounts[accID];
  }

  closeAccount(accID) {
    let accountObject = this.accounts[accID]; //scoping, must redefine variable
    accountObject.close();
  }

  listAccounts() {
    let clone = deepClone(this.accounts);
    return clone;
  }

  accountTotal() {
    /*let total = 0;
        for (let accID in this.accounts) {
            let account = this.accounts[accID];
            total += account.balance;
        } */
    /* loop -> check balance in accs, add them together and continue iterating
        sum of balances in all accounts
        */
    return this.runningTotal;
  }

  updateTotalAccountBalance(transactionType, amount) {
    if (transactionType === "deposit") {
      //console.log(this);
      this.runningTotal += amount;
      //console.log("deposit", amount, this.runningTotal);
    } else if (transactionType === "withdrawal") {
      this.runningTotal -= amount;
    } else {
      throw new Error("Invalid transaction type.");
    }
  }

  loanMoney(accID, amount) {
    let accountObject = this.accounts[accID]; //this evaluates what u wanna do with the first parameter -> identifying an acc
    accountObject.loan(amount);
    this.loans.push({ amountOwed: amount, moneyOwing: true, accountID: accID }); //record the loan when making the loan
  }

  listLoans() {
    return this.loans;
  }

  transfer(ID1, ID2, amount) {
    this.accounts[ID1].withdraw(amount);
    this.accounts[ID2].deposit(amount);
  }
}
