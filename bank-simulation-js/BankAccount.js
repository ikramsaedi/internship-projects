import {isValidAccount} from "./validationFunctions"

export class BankAccount {
    constructor(customer, bank) {
        this._active = false; 
        this._balance = 0.00; //setting it to 0.00 (floating point datatype) -> allows ppl to have cents in bank acc
        this._id; //how to make ID unique?
        this._owner = [customer];
        this._bank = bank;
        this._transactionHistory = [];
    }

    open() {
        if(!isValidAccount()) {  //importing function from validation
            this._active = true;
            this._balance = 0;
        }
        else {
            throw new Error("This account is already active.");
        }
    }

    close() {
        if(this._active) {
            this._active = false;
        }
        else {
            throw new Error("This account is already closed.")
        }

    }

    withdraw(withdrawAmount) {
        if(this._balance >= withdrawAmount) {
            
        }
    }

    deposit(){

    }

    get balance() {
        return this._balance;
    }
}