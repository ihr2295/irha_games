document.addEventListener("DOMContentLoaded", function () {
  const playerNameElement = document.getElementById("playerNameDisplay");
  const playerName = sessionStorage.getItem('playerName');

  console.log("Player Name:", playerName); // Debugging statement

  // Update the name display
  if (playerNameElement && playerName) {
      playerNameElement.textContent = decodeURIComponent(playerName);
  }

  // Function to show Name Modal
  const showNameModal = () => {
      console.log("Showing Name Modal"); // Debugging statement

      // Show Name Modal
      const nameModal = document.getElementById('nameModal');
      if (nameModal) {
          nameModal.style.display = 'block';
      }
  };

  // Function to show Start Game Modal
  const showStartGameModal = () => {
      // Show Start Game Modal
      const startGameModal = document.getElementById('startGameModal');
      if (startGameModal) {
          startGameModal.style.display = 'block';
      }
  };

  // Function to start the game
  window.startGame = () => {
      const playerNameInput = document.getElementById("playerName");
      const playerName = playerNameInput.value.trim();

      if (playerName) {
          sessionStorage.setItem('playerName', playerName);

          const playerNameInModal = document.getElementById('startGameMessage');
          if (playerNameInModal) {
              playerNameInModal.textContent = `Ready to start the game, ${playerName}?`;
          }

          showStartGameModal();
      } else {
          alert("Please enter your name before starting the game.");
      }
  };

  // Add event listener to the "No" button only if it exists
  const startGameModalNoButton = document.getElementById('startGameModalNo');
  if (startGameModalNoButton) {
      startGameModalNoButton.addEventListener('click', () => {
          const startGameModal = document.getElementById('startGameModal');
          if (startGameModal) {
              startGameModal.style.display = 'none';
          }
      });
  }

  // Handle "OK" button click for Start Game Modal
  const startGameModalOkButton = document.getElementById('startGameModalOk');
  if (startGameModalOkButton) {
      startGameModalOkButton.addEventListener('click', () => {
          const playerName = sessionStorage.getItem('playerName');
          if (playerName) {
              window.location.href = `game.html?playerName=${encodeURIComponent(playerName)}`;
          } else {
              alert("Player name not found.");
          }
      });
  }







  // Function to show Instructions Modal
const showInstructionsModal = () => {
  const instructionsModal = document.getElementById('instructionsModal');
  if (instructionsModal) {
    instructionsModal.style.display = 'block';
  }
};

// Function to close Instructions Modal
const closeInstructionsModal = () => {
  const instructionsModal = document.getElementById('instructionsModal');
  if (instructionsModal) {
    instructionsModal.style.display = 'none';
  }
};

// Add event listener to the "Instructions" button only if it exists
const instructionsButton = document.getElementById('instructionsButton');
if (instructionsButton) {
  instructionsButton.addEventListener('click', showInstructionsModal);
}

// Add event listener to the close button of Instructions Modal only if it exists
const closeButton = document.querySelector('#instructionsModal .close');
if (closeButton) {
  closeButton.addEventListener('click', closeInstructionsModal);
}

// Add event listener to the background of Instructions Modal only if it exists
const instructionsModal = document.getElementById('instructionsModal');
if (instructionsModal) {
  instructionsModal.addEventListener('click', (event) => {
    if (event.target === instructionsModal) {
      closeInstructionsModal();
    }
  });
}



  // Additional logic for game.html
  if (window.location.pathname.endsWith("game.html")) {
      const playGame = () => {
          const playerOptions = document.querySelectorAll('.rock, .paper, .scissor');
          let playerScore = 0;
          let computerScore = 0;
          let moves = 0;

          playerOptions.forEach(option => {
              option.addEventListener('click', function () {
                  const movesLeft = document.querySelector('.movesleft');
                  moves++;
                  movesLeft.innerText = `Moves Left: ${10 - moves}`;
                  
                  const playerChoice = this.getAttribute('data-choice');
                  const choiceNumber = Math.floor(Math.random() * 3);
                  const computerChoice = ['rock', 'paper', 'scissors'][choiceNumber];

                //  winner(this.innerText.toLowerCase(), computerChoice);
                winner(playerChoice, computerChoice); // Pass player's choice to winner function

                  if (moves === 10) {
                      gameOver(playerOptions, movesLeft);
                  }
              });
          });

          const winner = (player, computer) => {
              const result = document.querySelector('.result');
              const playerScoreBoard = document.querySelector('.p-count');
              const computerScoreBoard = document.querySelector('.c-count');

              if (player === computer) {
                  result.textContent = 'Tie';
              } else if ((player === 'rock' && computer === 'scissors') ||
                  (player === 'paper' && computer === 'rock') ||
                  (player === 'scissors' && computer === 'paper')) {
                  result.textContent = 'Player Won';
                  playerScore++;
              } else {
                  result.textContent = 'Computer Won';
                  computerScore++;
              }

              playerScoreBoard.textContent = playerScore;
              computerScoreBoard.textContent = computerScore;
          };

          const gameOver = (playerOptions, movesLeft) => {
              const chooseMove = document.querySelector('.move');
              const result = document.querySelector('.result');
              const reloadBtn = document.querySelector('.reload');

              playerOptions.forEach(option => {
                  option.style.display = 'none';
              });

              chooseMove.innerText = 'Game Over!!';
              movesLeft.style.display = 'none';

              if (playerScore > computerScore) {
                  result.style.fontSize = '2rem';
                  result.innerText = 'You Won The Game';
                  result.style.color = '#308D46';
              } else if (playerScore < computerScore) {
                  result.style.fontSize = '2rem';
                  result.innerText = 'You Lost The Game';
                  result.style.color = 'red';
              } else {
                  result.style.fontSize = '2rem';
                  result.innerText = 'Tie';
                  result.style.color = 'grey';
              }

              reloadBtn.innerText = 'Restart';
              reloadBtn.style.display = 'flex';
              reloadBtn.addEventListener('click', () => {
                  window.location.reload();
              });
          };
      };

      playGame();
  }
});
