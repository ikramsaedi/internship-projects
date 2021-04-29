export class Student {
  constructor(name, DOB, faveFood, faveSuit) {
    this._name = name;
    this._DOB = DOB;
    this._faveFood = faveFood;
    this._faveSuit = faveSuit;
    this._grades = {};
  }
  addGrade(subject, percent) {
    //needs to check if the student is allowed to get that % (student name check)
    //if they r not allowed, throw an error
    //determine the correlating grade if they r allowed
    //put the grade into the grades obj on the student
  }
}
