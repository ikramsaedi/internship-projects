export class Student {
  constructor(ID, name, DOB, faveFood, faveSuit) {
    this._ID = ID;
    this._name = name;
    this._DOB = DOB;
    this._faveFood = faveFood;
    this._faveSuit = this.validateSuit(faveSuit);
    this._grades = {};
  }
  addGrade(subject, percent) {
    //needs to check if the student is allowed to get that % (student name check)
    //if they r not allowed, throw an error
    //determine the correlating grade if they r allowed
    //put the grade into the grades obj on the student
  }

  validateSuit(suit) {
    const validSuits = ["Hearts", "Diamonds", "Clubs", "Spades"];

    if (validSuits.includes(suit)) {
      return suit;
    } else {
      throw new Error("Invalid suit.");
    }
  }
}
