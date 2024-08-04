Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

let d1 = 0;
let d2 = 0;
Matrix.forEach((array, index) => {
  let last_index = array.length - 1 - index;

  d1 += Matrix[index][index];
  d2 += Matrix[index][last_index];
});

console.log('maka hasilnya adalah ' + d1 + ' - ' + d2 + ' = ' + (d1-d2));