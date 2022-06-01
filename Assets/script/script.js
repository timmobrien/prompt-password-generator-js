
// Arrays for character types
const specialCharacters = ["!", "@", "#", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", "~", "[", "]", "|", "{", "{", "}", ":", ";"];
const lowercaseCharacters = ['q', "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
const numberCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
// Added more spaces in this array to increase chance of getting a space
const spaceCharacter = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",];

// lowercase array converted to string & changed to upper case, before comma's are removed and it is split back into array
const uppercaseCharacters = lowercaseCharacters.toString().toUpperCase().replace(/,/g,"").split("")

// Variables that target the buttons
const generateBtn = document.getElementById('generate');
const copyButton = document.getElementById('copy')


// Main function 
generatePassword = () => {

  // Confirms user wants to start creating password
  var toStart = confirm('Do you want a new password?');

  // If user selects "cancel", we say goodbye.
  if (!toStart) {
    alert("Maybe another time.");
    return;
  }

  console.log('User beginning pasword creation')

  // Variable for the number of characters returned from function
  const characterCountInput = askCharacterCount();
  console.log(`The user has selected ${characterCountInput} characters`);

  // Variable for the array of all possible characters the user chose from
  const characterChoiceArray = AskUserChoice();

  // Function that creates the password
  function characterRandomiser() {
    // empty array as a placeholder
    const password = [];
    // Loop that randomly selects characters & pushes them into the array until the password is the desired length
    for (let index = 0; index < characterCountInput; index++) {
      const random = characterChoiceArray[Math.floor(Math.random() * characterChoiceArray.length)];
      password.push(random);
    }
    return password.join("");
  }

  // Retrieves the password from the nested function
  const finalPassword = characterRandomiser();
  console.log(`The user's final password is: ${finalPassword}`);

  // Now that the password is ready, copy button appears
  copyButton.style.display = ('inline-block')

  return finalPassword;
}

// Function to ask & validate number of characters input
AskUserChoice = () => {

  // Define choices variable which is a placeholder to be added to
  const choices = [""]
  // Asking for user input in each category. If user says yes, that character array is pushed to the choices array
  // Consecutive if statements allow for multple inputs to be inputted
  const chooseNumber = confirm('Do you want to include numbers?');
  if (chooseNumber) { Array.prototype.push.apply(choices, numberCharacters) };

  const chooseUpper = confirm('Do you want uppercase characters?');
  if (chooseUpper) { Array.prototype.push.apply(choices, uppercaseCharacters) };

  const chooseLower = confirm('Do you want lowercase characters?');
  if (chooseLower) { Array.prototype.push.apply(choices, lowercaseCharacters) };

  const chooseSpecial = confirm('Do you want to include special characters?');
  if (chooseSpecial) { Array.prototype.push.apply(choices, specialCharacters) };

  const chooseSpace = confirm('Do you want spaces in your password?')
  if (chooseSpace) { Array.prototype.push.apply(choices, spaceCharacter) };

  // If after all options, if the choices array length has not changed, user must go back and select at least 1 option
  if (choices.length === 1) {
    alert('You must choose at least one item')
    return AskUserChoice();
  }

  console.log(choices)

  // returns the final array
  return choices;
}

askCharacterCount = () => {
  // parseInt converts string response to intiger
  let inputCount = parseInt(prompt('Choose a number of characters between 8-128'));
  // If user does not enter anything
  if (!inputCount) {
    alert('You must input a number')
    // Send back to retry
    return askCharacterCount();

    // The two else if statements below could be merged with ||, but I opted not to in favour of having two alerts
  } else if (inputCount < 8) {
    alert('Your number was too low');
    // User sent back to retry
    return askCharacterCount();

  } else if (inputCount > 128) {
    alert('Your number was too high')
    // User sent back to retry
    return askCharacterCount();

    // If number satisfies criteria, it is returned
  } else {
    return inputCount;
  }
}

// Write password to the #password input
writePassword = () => {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// onclick of copy button, this function runs and copies the text
copyPassword = () => {
  // function identifies the password element, selects & copies text before alerting user it is complete
  const copyText = document.getElementById('password')
  copyText.select();
  navigator.clipboard.writeText(copyText.value)
  alert('Copied the text')
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
copyButton.addEventListener('click', copyPassword)

