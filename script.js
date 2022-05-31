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

// const number = Math.trunc(Math.random() * 20); // Math.trunc() doesn't round the number, just get rid of fractional part of number, result here is will be a number which goes from 0 to 19, because the result of this will never really include the number 20. it might only include like 19.999999... but of course we're cutting off that decimal part.

// Math.rondom() by default gives us number between 0 and 1

// now it's between 1 to 20
const secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = secretNumber;

let score;

if (!localStorage.getItem('score')) {
  score = +document.querySelector('.score').textContent;
  localStorage.setItem('score', score);
} else {
  score = localStorage.getItem('score');
  document.querySelector('.score').textContent = score;
}

// TODO secretNumber needs to be in localStorage

console.log(score);

document.querySelector('.check').addEventListener('click', function (e) {
  const guess = Number(document.querySelector('.guess').value);

  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '😐✋ No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Corrent Number!';
  } else if (guess > secretNumber) {
    score--;
    document.querySelector('.message').textContent = '📈 Too high!';
    document.querySelector('.score').textContent = score;
    localStorage.setItem('score', score);
  } else if (guess < secretNumber) {
    score--;
    document.querySelector('.message').textContent = '📉 Too low!';
    document.querySelector('.score').textContent = score;
    localStorage.setItem('score', score);
  }
});

document.querySelector('.again').addEventListener('click', function (e) {
  localStorage.clear();
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
});
