document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, CustomEase, CustomBounce);

  let rounds = 5;
  let humanScore = 0;
  let computerScore = 0;
  let handleSelection = ["rock", "paper", "scissor"];
  let playBtn = document.querySelector(".play__button");
  let rockBtn = document.querySelector(".hand__selection-rock");
  let paperBtn = document.querySelector(".hand__selection-paper");
  let scissorBtn = document.querySelector(".hand__selection-scissor");
  let handSelectionArea = document.querySelector(".hand__selection");
  let humanSpanScore = document.querySelector(".stats__player-score");
  let computerSpanScore = document.querySelector(".stats__computer-score");
  let notification = document.querySelector(".notification");
  let playerAreaSpan = document.querySelector(".play__area-player-span");
  let computerAreaSpan = document.querySelector(".play__area-computer-span");
  let notificationText = document.querySelector(".notification__text");
  let imageChoices = {
    rock: "🪨",
    paper: "📃",
    scissor: "✂️",
  };

  let getHumanChoice = (e) => {
    selected = e.target;
    let choice;

    if (e.target.classList.contains("hand__selection-rock")) {
      choice = "rock";
    } else if (e.target.classList.contains("hand__selection-paper")) {
      choice = "paper";
    } else {
      choice = "scissor";
    }

    console.log(imageChoices);
    playerAreaSpan.innerHTML = imageChoices[choice];
    return choice;
  };

  let getComputerChoice = () => {
    let rand = Math.floor(Math.random() * 3);
    let choice = handleSelection[rand];
    computerAreaSpan.innerHTML = imageChoices[choice];

    return choice;
  };

  let validateAndLowerCase = (text) => {
    if (text === null) return false;
    text = text.toLowerCase();
    if (!handleSelection.includes(text)) return false;
    return text;
  };

  let notificationAnimation = (addClass = "") => {
    console.log(addClass);
    let tl = gsap.timeline();

    tl.call(() => {
      handSelectionArea.style.pointerEvents = "none";
      for (let i = 0; i < handSelectionArea.children.length; i++) {
        handSelectionArea.children[i].classList.add("disable");
      }
    })

      .to(notification, {
        className: "notification " + addClass,
        duration: 1,
      })

      .to(
        notification,
        {
          y: 50,
          opacity: 1,
          ease: "back.out",
          duration: 0.5,
        },
        "<",
      )

      .to(notification, {
        y: 0,
        opacity: 0,
        ease: "back.in",
        duration: 0.5,
        delay: 1.5,
      })

      .call(() => {
        handSelectionArea.style.pointerEvents = "auto";
        for (let i = 0; i < handSelectionArea.children.length; i++) {
          handSelectionArea.children[i].classList.remove("disable");
        }
      });
  };

  let playRound = (humanChoice, computerChoice) => {
    let humanWon = false;
    if (humanChoice === computerChoice) {
      notification.innerHTML = `It's a tie! player: ${humanChoice},  computer: ${computerChoice}`;
      notificationAnimation();
      // console.log(
      //   `It's a tie! player: ${humanChoice},  computer: ${computerChoice}`,
      // );
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

    notification.innerHTML = `You ${humanWon ? "Win" : "Lose"}! ${humanChoice} ${humanWon ? "beats" : "can't beat"} ${computerChoice}`;
    let winLoseClass = humanWon ? "win" : "lose";
    console.log(winLoseClass);
    notificationAnimation(winLoseClass);
    // console.log(

    //   `You ${humanWon ? "Win" : "Lose"}! ${humanChoice} beats ${computerChoice}`,
    // );
  };
  let handleClick = () => {
    handSelectionArea.style.display = "block";

    // let humanSelection = getHumanChoice();
    // let computerSelection = getComputerChoice();
    // playRound(humanSelection, computerSelection);
    // console.log(`PlayerScore: ${humanScore}`);
    // console.log(`ComputerScore: ${computerScore}`);
  };

  let handleHandChoice = (e) => {
    let humanSelection = getHumanChoice(e);
    let computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
    humanSpanScore.innerHTML = humanScore;
    computerSpanScore.innerHTML = computerScore;
  };

  playBtn.addEventListener("click", handleClick);
  handSelectionArea.addEventListener("click", handleHandChoice);

  //   for (let index = 0; index < rounds; index++) {
  //   }
});
