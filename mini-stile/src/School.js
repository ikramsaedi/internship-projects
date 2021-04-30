import { personIDGen, subjectIDGen } from "./IDgenerator";
import { Teacher } from "./Teacher";
import { Subject } from "./Subject";
import { Student } from "./Student";

export class School {
  constructor(name, suburb, mascot) {
    this._name = name;
    this._suburb = suburb;
    this._mascot = mascot;
    this._teachers = {};
    this._subjects = {};
    this._students = {};
  }
  get teachers() {
    return this._teachers;
  }

  get subjects() {
    return this._subjects;
  }

  get students() {
    return this._students;
  }

  createSubject(name, room, times, teacher) {
    let subjectID = subjectIDGen(name, room);
    if (teacher instanceof Teacher) {
      let subject = new Subject(subjectID, teacher, name, room, times);
      this._subjects[subjectID] = subject;
      return subjectID;
    } else {
      throw new Error("Please assign a valid teacher.");
    }
  }

  hireTeacher(name, DOB, ambition) {
    let teacherID = personIDGen(name, DOB);
    let teacher;
    switch (ambition) {
      case "Create a student army":
        teacher = new Teacher(teacherID, name, DOB, ambition);
        break;

      case "Kill the principal and take their job":
        teacher = new Teacher(teacherID, name, DOB, ambition);
        break;

      case "Doing the bare minimum until they retire":
        teacher = new Teacher(teacherID, name, DOB, ambition);
        break;

      default:
        throw new Error("Invalid ambition.");
    }
    this._teachers[teacherID] = teacher;
    return teacherID;
  }
  enrolStudent(name, DOB, faveFood, faveSuit) {
    let studentID = personIDGen(name, DOB);
    let student = new Student(studentID, name, DOB, faveFood, faveSuit);
    this._students[studentID] = student;
    return studentID;
    //generate an ID
    //needs to check if the suit is valid (hearts, spades etc)
    //then create a new student obj with the parameters and the iD
    //then add the student obj to the school's list of student objs
  }
  assignAssistantTeacher(subject, teacher) {
    //this is only for assigning assistant teachers bc create class alr assigns primary ones
    //check if theres alr an assistant teacher assigned
    //if there isnt one assigned, assign the new teacher
    //of not, return an error saying there's alr an assistant teacher
  }
  assignStudent(subject, student) {
    //needs to check if there's alr 25 or more students in the subject
    //if there isnt, add the student to the subjects students obj lists
    //otherwise, throw an error
  }
  gradingTime() {
    //for each subject, tell the primary teacher to doYourJob()
  }
}
