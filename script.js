// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Below is the generate password function
function generatePassword(){
  var validChars = ''; 
  var l_password = '';  // local variable storing the generated password
  var isValidPassword = false;   

  // get and validate the length of password 
  var numOfChars = prompt("Please specify the length of the password.\n(8-128 characters)"); 

  if (numOfChars != null) {
    if (isNaN(numOfChars) || numOfChars.includes(".")) {
        alert("The Input must be an integer."); 
        return l_password; 
    } else if (numOfChars < 8 || numOfChars > 128) {
        alert("The length of password must be between 8 to 128 characters."); 
        return l_password; 
    }
  } else {
    return l_password; 
  }

  // get and validate the character types and store in the object array. 
  var charTypes = [
    {isIncluded: confirm("Click OK if the password includes uppercase characters."),
     charString: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
     // isFulfilled property is used to store the result when validating the generated password
     isFulfilled: false  
    },
    {isIncluded: confirm("Click OK if the password includes lowercase characters."),
     charString: "abcdefghijklmnopqrstuvwxyz", 
     isFulfilled: false
    }, 
    {isIncluded: confirm("Click OK if the password include numbers."),
     charString: "1234567890",
     isFulfilled: false
    }, 
    {isIncluded: confirm("Click OK if the password includes special characters.\nSpecial characters include \"!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\"."),
     charString: "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~", 
     isFulfilled: false
    }
  ];

  if (!(charTypes[0].isIncluded || charTypes[1].isIncluded ||
        charTypes[2].isIncluded || charTypes[3].isIncluded)) {
      alert("Please select at least one type of characters.")
      return l_password; 
  }

  // Concat the strings of all included character types. 
  for (var i = 0; i < charTypes.length; i++){
    if (charTypes[i].isIncluded) validChars = validChars + charTypes[i].charString;   
  }; 

  while (!isValidPassword) {
    // generate a password based on the criteria using random function 
    l_password = ''; 

    for (var j = 1; j <= numOfChars; j++) {
      l_password = l_password + validChars.charAt(Math.floor(Math.random()*validChars.length));
    }

    // check whether the generated password incudes all the required character types
    for (var i = 0; i < charTypes.length; i++){
      if (charTypes[i].isIncluded) {
        charTypes[i].isFulfilled = false; 
        for (var j = 0; j < l_password.length; j++) { 
          if (charTypes[i].charString.includes(l_password.charAt(j))) {
            charTypes[i].isFulfilled = true; 
            break; 
          }
        }
      } else {
        charTypes[i].isFulfilled = true; 
      }
    }; 

    /* if the generated password cannot fulfill all the required character types, 
    set isValidPassword to false to let the program to generate a password again 
    until all the character types can be fulfilled.*/
    isValidPassword = charTypes[0].isFulfilled && charTypes[1].isFulfilled && 
                      charTypes[2].isFulfilled && charTypes[3].isFulfilled;
  }

  return l_password; 
}