const sentence = "Saya sangat senang mengerjakan soal algoritma";
function longest(sentence) {
  let temp = 0;
  let temp_word = '';
  sentence.split(' ').forEach(word => {
    if(word.length > temp) {
      temp = word.length;
      temp_word = word;
    }
  });
  return temp_word + ': ' + temp + ' character';
}

console.log(longest(sentence));