import { School } from "./School";

let stileSchool;
let primaryTeacher;
let assistantTeacher;
let DOB;
let student;
let subject;

beforeEach(() => {
  //create successful variable
  stileSchool = new School("Stile School", "Melbourne", "Seedling");
});

describe("Start of Term", () => {
  test("Creating a school", () => {
    expect(stileSchool).toEqual({
      _name: "Stile School",
      _suburb: "Melbourne",
      _mascot: "Seedling",
      _teachers: {},
      _subjects: {},
      _students: {},
    });
  });

  test("Hiring a teacher", () => {
    let DOB = new Date(1974, 6, 8);
    let testID = stileSchool.hireTeacher(
      "Ms Jenkins",
      DOB,
      "Kill the principal and take their job"
    );
    expect(stileSchool.teachers).toEqual({
      [testID]: {
        _ID: testID,
        _name: "Ms Jenkins",
        _DOB: DOB,
        _faveStudent: null,
        _hatedStudent: null,
        _ambition: "Kill the principal and take their job",
      },
    });
  });

  test("Creating a subject", () => {
    let DOB = new Date(1974, 6, 8);
    let staffID = stileSchool.hireTeacher(
      "Ms Jenkins",
      DOB,
      "Kill the principal and take their job"
    );
    let subjectID = stileSchool.createSubject(
      "Year 10 Maths",
      "10B",
      ["Monday 10:00 am", "Thursday 12:30 pm"],
      stileSchool.teachers[staffID]
    );
    expect(stileSchool.subjects).toEqual({
      [subjectID]: {
        _ID: subjectID,
        _teacher: stileSchool.teachers[staffID],
        _assistantTeacher: null,
        _students: {},
        _name: "Year 10 Maths",
        _room: "10B",
        _times: ["Monday 10:00 am", "Thursday 12:30 pm"],
      },
    });
  });

  test("Enrol a student", () => {
    let DOB = new Date(2004, 6, 8);
    let testID = stileSchool.enrolStudent(
      "Polly Cracker",
      DOB,
      "Cheese and biscuits",
      "Hearts"
    );
    expect(stileSchool.students).toEqual({
      [testID]: {
        _ID: testID,
        _name: "Polly Cracker",
        _DOB: DOB,
        _faveFood: "Cheese and biscuits",
        _faveSuit: "Hearts",
        _grades: {},
      },
    });
  });

  test("Assign assistant teacher", () => {
    let DOB = new Date(1974, 6, 8);
    let primaryID = stileSchool.hireTeacher(
      //primary teacher
      "Ms Jenkins",
      DOB,
      "Kill the principal and take their job"
    );

    let assistantID = stileSchool.hireTeacher(
      //assistant teacher
      "Mr Smith",
      DOB,
      "Doing the bare minimum until they retire"
    );

    let subjectID = stileSchool.createSubject(
      "Year 10 Maths",
      "10B",
      ["Monday 10:00 am", "Thursday 12:30 pm"],
      stileSchool.teachers[primaryID]
    );
    stileSchool.assignAssistantTeacher(subjectID, assistantID);

    expect(stileSchool._subjects[subjectID][_assistantTeacher]).toEqual(
      stileSchool._teachers[assistantID]
    ); //check specific property
  });

  test("Assign student to a class", () => {
    let teacherDOB = new Date(1974, 6, 8);
    let teacherID = stileSchool.hireTeacher(
      //primary teacher
      "Ms Jenkins",
      teacherDOB,
      "Kill the principal and take their job"
    );
    let subjectID = stileSchool.createSubject(
      "Year 10 Maths",
      "10B",
      ["Monday 10:00 am", "Thursday 12:30 pm"],
      stileSchool.teachers[teacherID]
    );
    let studentDOB = new Date(2004, 6, 8); //student
    let studentID = stileSchool.enrolStudent(
      "Polly Cracker",
      studentDOB,
      "Cheese and biscuits",
      "Hearts"
    );
    stileSchool.assignStudent(subjectID, studentID);
    console.log(stileSchool._students[studentID]);
    expect(stileSchool._subjects[subjectID]._students).toEqual({
      [studentID]: stileSchool._students[studentID], //this is students obj with studentID in it, referring to the same obj as the one in the school
    });
  });
});
