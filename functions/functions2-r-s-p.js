let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

  /*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */

  document.addEventListener("keydown",(event) => {
    if (event.key = 'r') {
      playGame('rock');
    } else if (event.key = 'p') {
      playGame('paper');
    } else if (event.key = 's') {
      playGame('scissors');
    }
  })


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  const divImg = document.querySelector(".image-result")


  if (playerMove === 'rock')
  {
    if (computerMove === 'paper') {
      result = "computer win"
      score.losses += 1
    } else if (computerMove === 'scissors') {
      result = 'player win'
      score.wins += 1
    } else {
      result = 'draw'
      score.ties += 1
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'player win'
      score.wins += 1
    } else if (computerMove === 'scissors') {
      result = 'computer win'
      score.losses += 1
    } else {
      result = 'draw'
      score.ties += 1
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'computer win'
      score.losses += 1
    } else if (computerMove === 'paper') {
      result = 'player win'
      score.wins += 1
    } else {
      result = 'draw'
      score.ties += 1
    }
  }
  
  localStorage.setItem('score',JSON.stringify(score))
  
  updateScoreElement();
  
  
  divImg.innerHTML = `<b>Player: <b> <img src='images/${playerMove}-emoji.png' class='move-icon'>`
  
  divImg.innerHTML += `<b>Computer: <b> <img src='images/${computerMove}-emoji.png' class='move-icon'>`


}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}