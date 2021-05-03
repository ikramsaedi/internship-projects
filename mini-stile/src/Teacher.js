export class Teacher {
  constructor(ID, name, DOB, ambition) {
    this._ID = ID;
    this._name = name;
    this._DOB = DOB;
    this._ambition = this.validateAmbition(ambition);
    this._faveStudent = null;
    this._hatedStudent = null;
    this._subjects = {};
  }

  assignGrade(student, subject, grade) {
    this._subjects[subject]._students[student].addGrade(subject, grade);
    // we had to make them know about the classes they were in, we couldn't think of any other way to do this
  }

  doYourJob(subjectID) {
    let currentSubject = this._subjects[subjectID];
    for (let keyName in currentSubject._students) {
      let grade = Math.floor(Math.random() * 101); //randomly generated percentage
      this.assignGrade(keyName, subjectID, grade);
    }
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
