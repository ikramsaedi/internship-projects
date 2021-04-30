export class Teacher {
  constructor(ID, name, DOB, ambition) {
    this._ID = ID;
    this._name = name;
    this._DOB = DOB;
    this._ambition = this.validateAmbition(ambition);
    this._faveStudent = null;
    this._hatedStudent = null;
  }

  assignGrade(student, subject, grade) {
    // get the student object to add the grade
  }

  getStudentList(subject) {
    // return the object containing all the students in that subject
  }

  doYourJob() {
    // call getStudentList and store the output in a constant
    // iterate through that constant and call assignGrade on each student
  }

  validateAmbition(ambition) {
    const validAmbitions = [
      "Create a student army",
      "Kill the principal and take their job",
      "Doing the bare minimum until they retire",
    ];

    if (validAmbitions.includes(ambition)) {
      return ambition;
    } else {
      throw new Error("Invalid ambition.");
    }
  }
}
