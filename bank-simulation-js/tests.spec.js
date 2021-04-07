import BankAccount from "./BankAccount";
import isValidAccount from "./validationFunctions";

describe("Bank Account", () => {
    test("newly opened account has zero balance", () => {
        const account = new BankAccount();
        account.open();
        expect(account.balance).toEqual(0);
    })
}




)