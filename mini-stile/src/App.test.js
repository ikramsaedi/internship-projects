import { School } from "./School";

describe("Start of Term", () => {
  test("Creating a school", () => {
    const stileSchool = new School("Stile School", "Melbourne", "Seedling");
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
    const stileSchool = new School("Stile School", "Melbourne", "Seedling");
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
    const stileSchool = new School("Stile School", "Melbourne", "Seedling");
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
      stileSchool.staffID
    );
    expect(stileSchool.subjects).toEqual({
      [subjectID]: {
        _ID: subjectID,
        _teacher: stileSchool.staffID,
        _assistantTeacher: null,
        _students: {},
        _name: "Year 10 Maths",
        _room: "10B",
        _times: ["Monday 10:00 am", "Thursday 12:30 pm"],
      },
    });
  });

  test("Enrol a student", () => {
    const stileSchool = new School("Stile School", "Melbourne", "Seedling");
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
});
