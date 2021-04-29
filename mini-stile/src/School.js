export class School {
  constructor(name, suburb, mascot) {
    this._name = name;
    this._suburb = suburb;
    this._mascot = mascot;
    this._teachers = {};
    this._classes = {};
    this._students = {};
  }
  createClass(name, room, times, teacher) {
    //generate an ID
    //check if the teacher is an obj
    // create a new class obj with the given parameters and the ID
    //add the new class obj to the schools obj of classes
  }
  hireTeacher(name, DOB, ambition) {
    //generate an ID
    //have a check to see if ambition is valid
    //create a new teacher obj with the parameters nd the ID
    //then add the teacher obj to the school list of teacher objs
  }
  enrolStudent(name, DOB, faveFood, faveSuit) {
    //generate an ID
    //needs to check if the suit is valid (hearts, spades etc)
    //then create a new student obj with the parameters and the iD
    //then add the student obj to the school's list of student objs
  }
  assignAssistantTeacher(classID, teacher) {
    //this is only for assigning assistant teachers bc create class alr assigns primary ones
    //check if theres alr an assistant teacher assigned
    //if there isnt one assigned, assign the new teacher
    //of not, return an error saying there's alr an assistant teacher
  }
  assignStudent(classID, student) {
    //needs to check if there's alr 25 or more students in the class
    //if there isnt, add the student to the class' students obj lists
    //otherwise, throw an error
  }
  gradingTime() {
    //for each class, tell the primary teacher to doYourJob()
  }
}
