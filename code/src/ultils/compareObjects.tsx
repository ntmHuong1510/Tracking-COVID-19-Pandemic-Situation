export default function compareObjects(obj1: any, obj2: any) {
  // Get the keys of the objects
  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);

  // Check if the objects have the same number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over the keys and compare the values
  for (var i = 0; i < keys1.length; i++) {
    var key = keys1[i];

    // Check if the keys are the same
    if (keys2.indexOf(key) === -1) {
      return false;
    }

    // Check if the values are the same
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // If we reach this point, the objects are the same
  return true;
}
