'use strict';
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let dice = document.querySelector('.dice');

let bgPlayer0 = document.querySelector('.player--0');
let bgPlayer1 = document.querySelector('.player--1');

let score = [0, 0];
let currentScore = 0;
let playing = true;
let player = false;
let mainScore = 100;
let allowHold = 0;

function setCurrentScore(player, score) {
  document.querySelector(`#current--${player}`).textContent = score;
}

function setScore(player, score) {
  document.querySelector(`#score--${player}`).textContent = score;
}

let again = function () {
  score = [0, 0];
  currentScore = 0;
  playing = true;
  player = 0;
  allowHold = 0;

  let scores = document.querySelectorAll('.score');
  for (let i = 0; i < scores.length; i++) scores[i].textContent = 0;

  dice.style.display = 'none';
  setScore(0, 0);
  setScore(1, 0);

  setCurrentScore(0, 0);
  setCurrentScore(1, 0);

  bgPlayer0.classList.add('player--active');
  bgPlayer1.classList.remove('player--active');
  bgPlayer0.classList.remove('player--winner');
  bgPlayer1.classList.remove('player--winner');
};
again();

btnRoll.addEventListener('click', function () {
  if (playing) {
    let ranScore = Math.trunc(Math.random() * 6) + 1;
    dice.style.display = 'block';
    dice.src = `dice-${ranScore}.png`;
    allowHold++;
    // trao quyen
    if (ranScore === 1) {
      currentScore = 0;
      setCurrentScore(player, currentScore);
      player = 1 - player;

      bgPlayer0.classList.toggle('player--active');
      bgPlayer1.classList.toggle('player--active');

      allowHold = 0;
    } else if (ranScore !== 1) {
      currentScore += ranScore;
      setCurrentScore(player, currentScore);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing && allowHold) {
    score[player] += currentScore;
    setScore(player, score[player]);
    setCurrentScore(player, 0);

    // win
    if (score[player] >= mainScore) {
      playing = false;

      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');

      dice.style.display = 'block';
    }

    // trao quyen
    currentScore = 0;
    player = 1 - player;

    bgPlayer0.classList.toggle('player--active');
    bgPlayer1.classList.toggle('player--active');
    allowHold = 0;
  }
});

// new game
btnNew.addEventListener('click', again);
