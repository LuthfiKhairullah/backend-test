const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const OUTPUT = QUERY.map(value => {
  return INPUT.filter(inputValue => inputValue === value).length;
});

console.log(OUTPUT);
