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

let score, secretNumber, message, currentColor;

// TODO implement red color
const colors = {
  primary: '#222',
  secondary: '#60b347',
};

// console.log(colors.primary); // test

// Each domain can store up to 5MB of data in LocalStorage 😄

const fillLocalStorage = function () {
  if (!localStorage.getItem('score')) {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    message = 'Start guessing...';
    currentColor = colors.primary;

    localStorage.setItem('score', score);
    localStorage.setItem('secretNumber', secretNumber);
    localStorage.setItem('message', message);
    localStorage.setItem('currentColor', currentColor);
  } else {
    score = localStorage.getItem('score');
    secretNumber = Number(localStorage.getItem('secretNumber'));
    message = localStorage.getItem('message');
    currentColor = localStorage.getItem('currentColor');
  }

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('.message').textContent = message;
  document.body.style.backgroundColor = currentColor;
};

fillLocalStorage();

const hasCompleted = function () {
  const check = document.querySelector('.check');

  if (currentColor === colors.secondary) {
    check.style.cssText = `cursor: not-allowed;
    background-color: #ccc`;
    check.setAttribute('disabled', '');
  }
};

hasCompleted();

// console.log(score); // test
// console.log(secretNumber); // test
// console.log(message); // test

document.querySelector('.check').addEventListener('click', function (e) {
  const guess = Number(document.querySelector('.guess').value); // getting value from our input

  console.log(guess, typeof guess); // test
  if (currentColor === colors.primary && score > 0) {
    if (!guess) {
      // if it's empty
      document.querySelector('.message').textContent = '😐✋ No number!';
      localStorage.setItem('message', '😐✋ No number!');
    } else if (guess === secretNumber) {
      currentColor = colors.secondary;
      document.querySelector('.message').textContent = '🎉 Corrent Number!';
      hasCompleted();
      document.body.style.backgroundColor = currentColor;

      localStorage.setItem('message', '🎉 Corrent Number!');
      localStorage.setItem('currentColor', currentColor);
    } else if (guess > secretNumber) {
      score--;
      document.querySelector('.message').textContent = '📈 Too high!';
      document.querySelector('.score').textContent = score;
      localStorage.setItem('message', '📈 Too high!');
      localStorage.setItem('score', score);
    } else if (guess < secretNumber) {
      score--;
      document.querySelector('.message').textContent = '📉 Too low!';
      document.querySelector('.score').textContent = score;
      localStorage.setItem('message', '📉 Too low!');
      localStorage.setItem('score', score);
    }
  }

  if (!(score > 0)) {
    document.body.style.backgroundColor = 'red';
    document.querySelector('.message').textContent = 'You lost!';
  }
});

document.querySelector('.again').addEventListener('click', function (e) {
  document.querySelector('.guess').value = '';
  document.querySelector('.check').style.cssText = `cursor: auto;`;
  document.querySelector('.check').removeAttribute('disabled');
  localStorage.clear();
  fillLocalStorage();
});
