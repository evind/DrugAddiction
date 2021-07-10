// Adds a leading `0` to `num` if it is less than 10
// num: a number representing the day/month of a date
export function addLeadingZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

export function getLabel(name, answer) {
  let choice = "";

  if (name === "Never" && answer === 1) {
    choice = "X";
  } else if (name === "Rarely" && answer === 2) {
    choice = "X";
  } else if (name === "Sometimes" && answer === 3) {
    choice = "X";
  } else if (name === "Fairly Often" && answer === 4) {
    choice = "X";
  } else if (name === "Often" && answer === 5) {
    choice = "X";
  } else if (name === "Almost Always" && answer === 6) {
    choice = "X";
  } else if (name === "Always" && answer === 7) {
    choice = "X";
  }

  return choice;
}
