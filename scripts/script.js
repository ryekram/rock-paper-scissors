document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  let rounds = 5;
  let humanScore = 0;
  let computerScore = 0;
  let handleSelection = ["rock", "paper", "scissor"];
  let playBtn = document.querySelector(".play__button");

  let getHumanChoice = () => {
    let result = null;
    while (!result) {
      let choice = window.prompt("Please select your hand: ");
      result = validateAndLowerCase(choice);
    }
    return result;
  };

  let getComputerChoice = () => {
    let rand = Math.floor(Math.random() * 3);
    console.log(`randomize : ${rand}`);
    let choice = handleSelection[rand];
    return choice;
  };

  let validateAndLowerCase = (text) => {
    if (text === null) return false;
    text = text.toLowerCase();
    if (!handleSelection.includes(text)) return false;
    return text;
  };

  let playRound = (humanChoice, computerChoice) => {
    let humanWon = false;
    if (humanChoice === computerChoice) {
      console.log(
        `It's a tie! player: ${humanChoice},  computer: ${computerChoice}`,
      );
      return;
    }
    if ((humanChoice === "rock") & (computerChoice === "scissor")) {
      humanScore += 1;
      humanWon = true;
    } else if ((humanChoice === "paper") & (computerChoice === "rock")) {
      humanScore += 1;
      humanWon = true;
    } else if ((humanChoice === "scissor") & (computerChoice === "paper")) {
      humanScore += 1;
      humanWon = true;
    } else {
      computerScore += 1;
    }
    console.log(
      `You ${humanWon ? "Win" : "Lose"}! ${humanChoice} beats ${computerChoice}`,
    );
  };
  let handleClick = () => {
    console.log("click");
    let humanSelection = getHumanChoice();
    let computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
    console.log(`PlayerScore: ${humanScore}`);
    console.log(`ComputerScore: ${computerScore}`);
  };
  playBtn.addEventListener("click", handleClick);

  //   for (let index = 0; index < rounds; index++) {
  //   }
});
