export class Teacher {
  constructor(name, DOB, ambition) {
    this._name = name;
    this._DOB = DOB;
    this._ambition = ambition;
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
}
