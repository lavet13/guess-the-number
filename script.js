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

let score, secretNumber, message, currentColor, highScore;

const colors = {
  primary: '#222',
  secondary: '#60b347',
  tertiary: '#e21919',
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
  localStorage.setItem('message', message);
};

const displayColor = function (color) {
  currentColor = color;
  document.body.style.backgroundColor = color;
  localStorage.setItem('currentColor', color);
};

const displaySecretNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const decreaseScore = function () {
  score--;
  document.querySelector('.score').textContent = score;
  localStorage.setItem('score', score);
};

const displayHighScore = function (highScore) {
  document.querySelector('.highscore').textContent = highScore;
};

const clearInputField = function () {
  document.querySelector('.guess').value = '';
  document.querySelector('.check').style.cssText = `cursor: auto;`;
  document.querySelector('.check').removeAttribute('disabled');
};

const clearLocalStorage = function () {
  localStorage.clear();
  localStorage.setItem('highScore', highScore);
};

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
    if (!localStorage.getItem('highScore')) {
      highScore = 0;
      localStorage.setItem('highScore', highScore);
    }
  } else {
    score = localStorage.getItem('score');
    highScore = localStorage.getItem('highScore');
    secretNumber = Number(localStorage.getItem('secretNumber'));
    message = localStorage.getItem('message');
    currentColor = localStorage.getItem('currentColor');
  }

  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = highScore;
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
  if (!guess) {
    // when there is no input
    displayMessage('😐✋ No number!');
  } else if (guess === secretNumber) {
    // When player wins
    if (score > highScore) {
      highScore = score;
      displayHighScore(highScore);
      localStorage.setItem('highScore', highScore);
    }
    displayColor(colors.secondary);
    displayMessage('🎉 Corrent Number!');
    hasCompleted();
    document.querySelector('.number').style.width = `${35}rem`;
    displaySecretNumber(secretNumber);
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      decreaseScore();
    } else {
      decreaseScore();
      displayColor(colors.tertiary);
      displayMessage('You lost! 😭');
      hasCompleted();
      displaySecretNumber(secretNumber);
    }
  }
});

document.querySelector('.again').addEventListener('click', function (e) {
  clearInputField();
  clearLocalStorage();
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
