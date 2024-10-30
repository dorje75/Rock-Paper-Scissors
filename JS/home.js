const rockButtonElement = document.querySelector(".rock-img");
const paperButtonElement = document.querySelector(".paper-img");
const scissorButtonElement = document.querySelector(".scissor-img");

const resetButtonElemenet = document.querySelector(".reset-button");
const autoPlayButtonElement = document.querySelector(".auto-play-button");

rockButtonElement.addEventListener('click',() => {
  playGame('Rock');
});

paperButtonElement.addEventListener('click',() => {
  playGame('Paper');
});

scissorButtonElement.addEventListener('click',() => {
  playGame('Scissors')
});

resetButtonElemenet.addEventListener('click',() => {
  resetScore();
});

autoPlayButtonElement.addEventListener('click',() => {
  autoPlay();
});

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  draws: 0,
};

const hiddenPart = document.querySelector(".js-hidden-part");
const matchStatusColumn = document.querySelector(".Main-div-match-status");
matchStatusColumn.style.display = "none";

const ScoreBoardTable = document.querySelector(".main-div-score-board");
ScoreBoardTable.style.display = "none";
const scoreBoardResultl = {
  wins: document.querySelector(".total-wins"),
  draws: document.querySelector(".total-draws"),
  losses: document.querySelector(".total-losses"),
};

const TotalAutoPlayMatches = document.querySelector(".auto-play-matches"); //div which shows the matches playes by computer vs computer
TotalAutoPlayMatches.style.display = "none";

function roboOutput() {
  const randomNum = Math.random();
  if (randomNum < 1 / 3) {
    return "Rock";
  } else if (randomNum < 2 / 3) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function playGame(UserInput) {
  const botOutput = roboOutput();
  let result;

  switch (UserInput) {
    case "Rock":
      switch (botOutput) {
        case "Rock":
          result = "Draw";
          score.draws++;
          break;
        case "Paper":
          result = "You lose!";
          score.losses++;
          break;
        case "Scissors":
          result = "You win!";
          score.wins++;
          break;
      }
      break;
    case "Paper":
      switch (botOutput) {
        case "Rock":
          result = "You win!";
          score.wins++;
          break;
        case "Paper":
          result = "Draw";
          score.draws++;
          break;
        case "Scissors":
          result = "You lose!";
          score.losses++;
          break;
      }
      break;
    case "Scissors":
      switch (botOutput) {
        case "Rock":
          result = "You lose!";
          score.losses++;
          break;
        case "Paper":
          result = "You win!";
          score.wins++;
          break;
        case "Scissors":
          result = "Draw";
          score.draws++;
          break;
      }
      break;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateWinStatus(result);
  updateMatchStatus(UserInput, botOutput);
  updateScoreElement();
}

function resetScore() {
  score = { wins: 0, losses: 0, draws: 0 };
  localStorage.removeItem("score");
  updateScoreElement();
}

function updateWinStatus(result) {
  document.querySelector(".win-status").innerHTML = `Result: ${result}`;
  const InsertEmoji = document.querySelector(".js-inser-emoji");

  let appropriateEmoji;

  switch (result) {
    case "You lose!":
      appropriateEmoji = "laughing";
      break;
    case "You win!":
      appropriateEmoji = "crying";
      break;
    default:
      appropriateEmoji = "neutral";
      break;
  }

  InsertEmoji.innerHTML = `<img src="Images/${appropriateEmoji}-emoji.png" class="resultant-emoji" />`;
}

function updateScoreElement() {
  ScoreBoardTable.style.display = "flex";

  scoreBoardResultl.wins.innerHTML = `${score.wins}`;
  scoreBoardResultl.draws.innerHTML = `${score.draws}`;
  scoreBoardResultl.losses.innerHTML = `${score.losses}`;
}

function updateMatchStatus(UserInput, botOutput) {
  matchStatusColumn.style.display = "flex";
  const userScoreDiplay = document.querySelector(".js-player-match-status");
  const computerScoreDisplay = document.querySelector(
    ".js-computer-match-status"
  );

  userScoreDiplay.innerHTML = `<img src="Images/${UserInput.toLowerCase()}-emoji.png" class="js-rock-human hand-action-style"/>`;
  computerScoreDisplay.innerHTML = `<img src="Images/${botOutput}-emoji.png" class="js-rock-computer hand-action-style"/>`;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    let totalAutoMatch = 1;
    document.querySelector(".auto-play-button").innerHTML = `Stop</br>Game`;
    TotalAutoPlayMatches.style.display = "flex";
    TotalAutoPlayMatches.innerHTML = `Match Starting`;
    intervalId = setInterval(() => {
      TotalAutoPlayMatches.innerHTML = `Match[${totalAutoMatch}]`;
      const playerMove = roboOutput();
      playGame(playerMove);
      totalAutoMatch++;
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    TotalAutoPlayMatches.style.display = "none";
    document.querySelector(".auto-play-button").innerHTML = "Auto</br>Play";
    // resetScore();
  }
}

updateScoreElement();
