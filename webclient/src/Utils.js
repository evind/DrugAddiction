// Adds a leading `0` to `num` if it is less than 10
// num: a number representing the day/month of a date
export function addLeadingZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
