let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  draws: 0,
};

const hiddenPart = document.querySelector(".js-hidden-part");
const matchStatusColumn = document.querySelector(".Main-div-match-status");
matchStatusColumn.style.display = "none";

const emoji = {
  laughingEmoji: document.querySelector(".laughing-emoji"),
  cryingEmoji: document.querySelector(".crying-emoji"),
  neutralEmoji: document.querySelector(".neutral-emoji"),
};
emoji.laughingEmoji.style.display = "none";
emoji.cryingEmoji.style.display = "none";
emoji.neutralEmoji.style.display = "none";

const handAction = {
  rock_human: document.querySelector(".js-rock-human"),
  paper_humman: document.querySelector(".js-paper-human"),
  scissor_human: document.querySelector(".js-scissor-human"),

  rock_computer: document.querySelector(".js-rock-computer"),
  paper_computer: document.querySelector(".js-paper-computer"),
  scissor_computer: document.querySelector(".js-scissor-computer"),
};

for (const key in handAction) {
  if (handAction.hasOwnProperty(key)) {
    handAction[key].style.display = "none";
  }
}

const ScoreBoardTable = document.querySelector(".main-div-score-board");
ScoreBoardTable.style.display='none';
const scoreBoardResultl={
  wins: document.querySelector(".total-wins"),
  draws:document.querySelector(".total-draws"), 
  losses:document.querySelector(".total-losses")

};


function roboOutput() {
  const randomNum = Math.random();
  if (randomNum < 1 / 3) {
    return "Rock";
  } else if (randomNum < 2 / 3) {
    return "Paper";
  } else {
    return "Scissor";
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
        case "Scissor":
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
        case "Scissor":
          result = "You lose!";
          score.losses++;
          break;
      }
      break;
    case "Scissor":
      switch (botOutput) {
        case "Rock":
          result = "You lose!";
          score.losses++;
          break;
        case "Paper":
          result = "You win!";
          score.wins++;
          break;
        case "Scissor":
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

  if (hiddenPart) {
    hiddenPart.style.display = "none";
  }
}

function updateWinStatus(result) {
  hiddenPart.style.display = "flex";
  document.querySelector(".win-status").innerHTML = `Result: ${result}`;
  emoji.laughingEmoji.style.display = "none";
  emoji.cryingEmoji.style.display = "none";
  emoji.neutralEmoji.style.display = "none";
  if (result === "You lose!") {
    emoji.laughingEmoji.style.display = "flex";
  } else if (result === "You win!") {
    emoji.cryingEmoji.style.display = "flex";
  } else {
    emoji.neutralEmoji.style.display = "flex";
  }
}

function updateScoreElement() {
  hiddenPart.style.display = "flex";
  ScoreBoardTable.style.display='flex';

  scoreBoardResultl.wins.innerText=`${score.wins}`;
  scoreBoardResultl.draws.innerText=`${score.draws}`;
  scoreBoardResultl.losses.innerText=`${score.losses}`;
  // document.querySelector(
  //   ".js-score-board"
  // ).innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Draws: ${score.draws}`;
}

function updateMatchStatus(UserInput, botOutput) {
  hiddenPart.style.display = "flex";
  matchStatusColumn.style.display = "flex";

  for (const key in handAction) {
    if (handAction.hasOwnProperty(key)) {
      handAction[key].style.display = "none";
    }
  }

  switch (UserInput) {
    case "Rock":
      handAction.rock_human.style.display = "flex";
      break;
    case "Paper":
      handAction.paper_humman.style.display = "flex";
      break;
    case "Scissor":
      handAction.scissor_human.style.display = "flex";
      break;
  }

  switch (botOutput) {
    case "Rock":
      handAction.rock_computer.style.display = "flex";
      break;
    case "Paper":
      handAction.paper_computer.style.display = "flex";
      break;
    case "Scissor":
      handAction.scissor_computer.style.display = "flex";
      break;
  }
}
updateScoreElement();
