//business logic

export function beepBoop(number) {
  let numberArray = [];
  const oneRegex = new RegExp("1");
  const threeRegex = new RegExp("3");

  for (let i = 0; i <= number; i++) {
    numberArray.push(i.toString());
  }

  numberArray.forEach(function(num, index) {
    if (num.match(oneRegex)) {
      numberArray[index] = "Beep!";
    } else if (num.match(threeRegex)) {
      numberArray[index] = "Won't you be my neighbor?";
    }
  });
  return numberArray.join(", ");
}
