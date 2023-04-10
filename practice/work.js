// program to check if the string is palindrome or not

function checkPalindrome(string) {
  // find the length of a string
  const len = string.length;
  console.log("String length:",len)
  // loop through half of the string
  for (let i = 0; i < len / 2; i++) {
    // check if first and last string are same
    console.log(len - 1 - i);
    if (string[i] !== string[len - 1 - i]) {
      return "It is not a palindrome";
    }
  }
  return "It is a palindrome";
}

// take input
const string = "racecar";

// call the function
const value = checkPalindrome(string);

console.log(value);
