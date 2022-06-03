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
  tertiary: '#e21919',
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
  document.querySelector('.message').textContent = message;
  document.querySelector('.number').textContent = '?';
  document.body.style.backgroundColor = currentColor;
};

fillLocalStorage();

const hasCompleted = function () {
  const check = document.querySelector('.check');

  if (currentColor === colors.secondary || currentColor === colors.tertiary) {
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
      // when there is no input
      document.querySelector('.message').textContent = '😐✋ No number!';
      localStorage.setItem('message', '😐✋ No number!');
    } else if (guess === secretNumber) {
      // When player wins
      currentColor = colors.secondary;
      document.querySelector('.message').textContent = '🎉 Corrent Number!';
      hasCompleted();
      document.body.style.backgroundColor = currentColor;
      document.querySelector('.number').style.width = `${35}rem`;
      document.querySelector('.number').textContent = secretNumber;

      localStorage.setItem('message', '🎉 Corrent Number!');
      localStorage.setItem('currentColor', currentColor);
    } else if (guess > secretNumber) {
      // When guess is too high
      score--;
      document.querySelector('.message').textContent = '📈 Too high!';
      document.querySelector('.score').textContent = score;
      localStorage.setItem('message', '📈 Too high!');
      localStorage.setItem('score', score);
    } else if (guess < secretNumber) {
      // When guess is too low
      score--;
      document.querySelector('.message').textContent = '📉 Too low!';
      document.querySelector('.score').textContent = score;
      localStorage.setItem('message', '📉 Too low!');
      localStorage.setItem('score', score);
    }
  }

  if (!(score > 0)) {
    currentColor = colors.tertiary;
    document.querySelector('.message').textContent = 'You lost! 😭';
    hasCompleted();
    document.body.style.backgroundColor = currentColor;

    localStorage.setItem('message', 'You lost! 😭');
    localStorage.setItem('currentColor', currentColor);
  }
});

document.querySelector('.again').addEventListener('click', function (e) {
  document.querySelector('.guess').value = '';
  document.querySelector('.check').style.cssText = `cursor: auto;`;
  document.querySelector('.check').removeAttribute('disabled');
  localStorage.clear();
  fillLocalStorage();
});

/*
Coding Challenge #1
Implement a game rest functionality, so that the player can make a new guess!

Your tasks:
1. Select the element with the 'again' class and attach a click event handler

2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables

3. Restore the initial conditions of the message, number, score and guess input
fields

4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK �

*/
