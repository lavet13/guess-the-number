'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Corrent Number!';
// console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

const number = Math.trunc(Math.random() * 20); // doesn't round the number, just get rid of fractional part of number, result here is will be a number which goes from 0 to 19, because the result of this will never really include the number 20. it might only include like 19.999999... but of course we're cutting off that decimal part.

document.querySelector('.check').addEventListener('click', function (e) {
  const guess = Number(document.querySelector('.guess').value);

  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '😐✋ No number!';
  }
});

// implement all the other scenarios...
