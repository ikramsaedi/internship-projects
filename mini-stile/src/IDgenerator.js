export function IDgenerator(name, DOB) {
  let nameID = name.split(" ").join("").slice(0, 4); //in cases of 2 letter names, split the name where theres a white space into an array of first nd last name, then mush them together and then use slice method
  let month = DOB.getMonth() + 1;
  let day = DOB.getDate();
  let ID = nameID + month + day;
  return ID;
}
