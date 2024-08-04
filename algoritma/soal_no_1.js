let string = "NEGIE1";
let new_string = '';
let temp = '';
for (let index = string.length - 1; index >= 0; index--) {
  
  if(!isNaN(parseInt(string[index]))) {
    temp = string[index] + temp; // jika angka tidak ingin direverse
    // temp += string[index]; // jika angka ingin direverse
  } else {
    new_string += string[index];
  }
}
new_string += temp;
console.log(new_string);