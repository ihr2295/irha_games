// Initialize scores and DOM elements
let playerScore = 0;
let computerScore = 0;
const pScore = document.getElementById('playerScore');
const cScore = document.getElementById('computerScore');
const compSelect = document.getElementById('computerSelect');
const playerSelect = document.getElementById('playerSelect');
const message = document.getElementById('message');
let gameActive = false;

// Function to randomly select rock, paper, or scissors for the computer
function computerPlay() {
  let arr = [1, 2, 3];
  let random = arr[Math.floor(Math.random() * arr.length)];
  let value;
  switch (random) {
    case 1:
      value = 'rock';
      break;
    case 2:
      value = 'paper';
      break;
    default:
      value = 'scissors';
  }
  return value;
}

// Function to determine the winner of a round
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 'Draw!';
  } else if ((playerSelection == "rock") && (computerSelection == "scissors")) {
    return "Player won!";
  } else if ((playerSelection == "paper") && (computerSelection == "rock")) {
    return "Player won!";
  } else if ((playerSelection == "scissors") && (computerSelection == "paper")) {
    return "Player won!";
  } else if ((playerSelection == "paper") && (computerSelection == "scissors")) {
    return "Computer won!";
  } else if ((playerSelection == "scissors") && (computerSelection == "rock")) {
    return "Computer won!";
  } else if ((playerSelection == "rock") && (computerSelection == "paper")) {
    return "Computer won!";
  }
}

// Function to handle the game flow for each player selection
function gameFlow(playerSelection) {
  const winner = selection(playerSelection);
  const result = winner.winner;
  const compMov = winner.compMove;
  displaySelection('player', playerSelection, result);
  displaySelection('computer', compMov, result);
  scoreBoard(result);
  message.innerText = result;
  whoWon();
  reset();
}

// Function to determine the winner and computer's move for a player selection
function selection(playerSelection) {
  let computer = computerPlay();
  let winner = playRound(playerSelection, computer)
  return {
    winner: winner,
    compMove: computer
  };
}

// Function to display the selected moves with styling based on the result
function displaySelection(player, selection, result) {
  if (player === 'player') {
    playerSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`;
    if (result === "Player won!") {
      playerSelect.style.color = 'green';
      compSelect.style.color = 'red';
    }
  } else {
    compSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`;
    if (result === "Computer won!") {
      compSelect.style.color = 'green';
      playerSelect.style.color = 'red';
    }
  }
  if (result === 'Draw!') {
    compSelect.style.color = '';
    playerSelect.style.color = '';
  }
}
// Function to update the scoreboard based on the result
function scoreBoard(result) {
  if (result === "Player won!") {
    playerScore++;
    pScore.innerText = playerScore;
    cScore.innerText = computerScore;
  } else if (result === "Computer won!") {
    computerScore++;
    pScore.innerText = playerScore;
    cScore.innerText = computerScore;
  } else {
    return false;
  }
}

// Function to check if the game has ended after 5 round
function endGame() {
  if (playerScore === 5 || computerScore === 5) {
    return true
  }
  return false;
}

// Function to display the winner of the game
function whoWon() {
  if (endGame()) {
    if (playerScore === 5) {
      message.innerText = 'Player is the Winner! Congratulations!'
    } else {
      message.innerText = 'Computer is the Winner! You Lose!'
    }
  }
}

// Function to reset the game after completion
function reset() {
  if (endGame()) {
    setTimeout(function(){
      playerScore = 0;
      computerScore = 0;
      compSelect.innerHTML = '';
      playerSelect.innerHTML = '';
      pScore.innerText = playerScore;
      cScore.innerText = computerScore;
      message.innerText = 'Play Again!';
      gameActive = false;
    }, 3000);    
  }
}

// Event listener to display game boards on button click
const submit = document.getElementById('submit');
submit.addEventListener('click', displayBoards.bind(this));

function displayBoards() {
  const start = document.getElementById('start');
  const boards = document.getElementById('boards');
  const select = document.getElementById('select');
  start.style.display = 'none';
  boards.style.display = 'block';
  select.style.display = 'block';
  gameActive = true;
}
// Event listeners for player selections (rock, paper, scissors)
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');

rock.addEventListener('click', gameFlow.bind(this, rock.id));
paper.addEventListener('click', gameFlow.bind(this, paper.id));
scissors.addEventListener('click', gameFlow.bind(this, scissors.id));