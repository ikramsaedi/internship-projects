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
    if (this._name.search(/(a|A)[nNmMpP]/) !== -1 && percent > 96) {
      throw new Error("Invalid grade.");
    } else if (this._name.search(/^(m|M).{0,2}[aAnNtT]$/) !== -1) {
      throw new Error("Invalid grade.");
    } else {
      let word;
      //work out the word
      if (percent >= 0 && percent <= 52) {
        word = "slug";
      } else if (percent > 52 && percent <= 67) {
        word = "sloth";
      } else if (percent > 67 && percent <= 86) {
        word = "chameleon";
      } else if (percent > 86 && percent <= 96) {
        word = "dugong";
      } else if (percent > 96 && percent <= 100) {
        word = "narwhal";
      }
      this._grades[subject] = { percent: percent, grade: word };
    }
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
