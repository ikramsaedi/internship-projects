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
      teacher._subjects[subjectID] = subject;
      return subjectID;
    } else {
      throw new Error("Please assign a valid teacher.");
    }
  }

  hireTeacher(name, DOB, ambition) {
    let teacherID = personIDGen(name, DOB);
    let teacher = new Teacher(teacherID, name, DOB, ambition);
    this._teachers[teacherID] = teacher;
    return teacherID;
  }
  enrolStudent(name, DOB, faveFood, faveSuit) {
    let studentID = personIDGen(name, DOB);
    let student = new Student(studentID, name, DOB, faveFood, faveSuit);
    this._students[studentID] = student;
    return studentID;
  }
  assignAssistantTeacher(subject, teacher) {
    let currentSubject = this._subjects[subject];

    if (currentSubject._assistantTeacher instanceof Teacher) {
      throw new Error("This subject already has an assistant teacher");
    } else {
      currentSubject._assistantTeacher = this._teachers[teacher];
    }
    //this is only for assigning assistant teachers bc create class alr assigns primary ones
    //check if theres alr an assistant teacher assigned
    //if there isnt one assigned, assign the new teacher
    //of not, return an error saying there's alr an assistant teacher
  }
  assignStudent(subject, student) {
    let currentSubject = this._subjects[subject];
    if (Object.keys(currentSubject._students).length < 3) {
      currentSubject._students[student] = this._students[student];
    } else {
      throw new Error("This subject is full!");
    }
    //needs to check if there's alr 3 or more students in the subject
    //if there isnt, add the student to the subjects students obj lists
    //otherwise, throw an error
  }
  gradingTime() {
    //for each subject, tell the primary teacher to doYourJob()
  }
}
