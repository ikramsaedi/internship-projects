/*
class BankAccount {
    constructor(owner, managedBy) {
        this._active = false;
        this._balance = 0;
        this._owner = owner;
        this._managedBy = managedBy;
        this.transactionHistory = [];
    }
}

export default BankAccount;
*/

export class BankAccount {
  constructor(updateBankInstitutionTotalBalance) {
    //references the this.updateTotalAccountBalance method in bank institution file
    this._balance;
    this._open;
    this._transactionHistory = [];
    this._updateBankInstitutionTotalBalance = updateBankInstitutionTotalBalance;
  }

  open() {
    if (this._open) {
      throw new ValueError();
    } else {
      this._open = true;
      this._balance = 0;
    }
  }

  close() {
    if (this._open) {
      this._open = false;
    } else {
      throw new ValueError();
    }
  }

  deposit(num) {
    if (this._open) {
      if (num > 0) {
        this._balance += num;
        this._transactionHistory.push({
          amount: num,
          date: new Date().toISOString().substr(0, 10),
          transactionType: "deposit",
        });
        this._updateBankInstitutionTotalBalance("deposit", num);
      } else {
        throw new ValueError();
      }
    } else {
      throw new ValueError();
    }
  }

  withdraw(num) {
    if (this._open) {
      if (num <= this._balance && num > 0) {
        this._balance -= num;
        this._transactionHistory.push({
          amount: num,
          date: new Date().toISOString().substr(0, 10),
          transactionType: "withdraw",
        });
        this._updateBankInstitutionTotalBalance("withdrawal", num);
      } else {
        throw new ValueError();
      }
    } else {
      throw new ValueError();
    }
  }

  loan(num) {
    if (this._open) {
      if (num > 0) {
        this._balance += num;
        this._transactionHistory.push({
          amount: num,
          date: new Date().toISOString().substr(0, 10),
          transactionType: "loan",
        });
      } else {
        throw new ValueError();
      }
    } else {
      throw new ValueError();
    }
  }

  getTransactionHistory() {
    return this._transactionHistory;
  }

  isActive() {
    return this._open;
  }

  get balance() {
    if (this._open) {
      return this._balance;
    } else {
      throw new ValueError();
    }
  }
}

export class ValueError extends Error {
  constructor() {
    super("Bank account error");
  }
}
