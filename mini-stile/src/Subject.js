export class Subject {
  constructor(teacher, name, room, times) {
    this._teacher = teacher;
    this._assistantTeacher = null;
    this._students = {};
    this._name = name;
    this._room = room;
    this._times = times;
  }

  // Our subject doesn't have any methods lol
}
