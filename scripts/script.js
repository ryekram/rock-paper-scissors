document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, CustomEase, CustomBounce);

  let round = 0;
  let humanScore = 0;
  let computerScore = 0;
  let handleSelection = ["rock", "paper", "scissor"];
  let playBtn = document.querySelector(".play__button");
  let handSelectionArea = document.querySelector(".hand__selection");
  let humanSpanScore = document.querySelector(".stats__player-score");
  let computerSpanScore = document.querySelector(".stats__computer-score");
  let notification = document.querySelector(".notification");
  let playerAreaSpan = document.querySelector(".play__area-player-span");
  let computerAreaSpan = document.querySelector(".play__area-computer-span");
  let endGame = document.querySelector(".endgame");
  let endGameMessage = document.querySelector(".endgame__message");
  let btnReset = document.querySelector(".endgame__reset");
  let imageChoices = {
    rock: "🪨",
    paper: "📃",
    scissor: "✂️",
  };

  let isGameOver = () => {
    if (round === 5) {
      endGame.style.display = "flex";

      if (humanScore > computerScore) {
        endGameMessage.innerHTML = "You won the game!";
      } else if (humanScore < computerScore) {
        endGameMessage.innerHTML = "Computer won the game!";
      } else {
        endGameMessage.innerHTML = "It's a draw!";
      }

      handSelectionArea.style.pointerEvents = "none";
    }
  };

  let handAnimation = (areaSpan) => {
    let tl = gsap.timeline({ repeat: 3, ease: "power.out" });
    tl.to(areaSpan, {
      onStart: () => {
        areaSpan.innerHTML = "🪨";
      },
      duration: 0.1,
    })
      .to(areaSpan, {
        onStart: () => {
          areaSpan.innerHTML = "📃";
        },
        duration: 0.1,
      })
      .to(areaSpan, {
        onStart: () => {
          areaSpan.innerHTML = "✂️";
        },
        duration: 0.1,
      });

    return tl;
  };

  let handShowAnimation = (areaSpan, firstTl, choiceHand) => {
    let tl = gsap.timeline();
    tl.add(firstTl(areaSpan)).call(() => {
      areaSpan.innerHTML = choiceHand;
      humanSpanScore.innerHTML = humanScore;
      computerSpanScore.innerHTML = computerScore;
    });
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
    handShowAnimation(playerAreaSpan, handAnimation, imageChoices[choice]);
    return choice;
  };

  let getComputerChoice = () => {
    let rand = Math.floor(Math.random() * 3);
    let choice = handleSelection[rand];
    handShowAnimation(computerAreaSpan, handAnimation, imageChoices[choice]);
    return choice;
  };

  let notificationAnimation = (addClass) => {
    let tl = gsap.timeline({ pause: true });
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
        "+=.5",
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

    return tl;
  };

  let playRound = (humanChoice, computerChoice) => {
    round++;
    let humanWon = false;
    if (humanChoice === computerChoice) {
      notification.innerHTML = `It's a tie!`;
      notificationAnimation().call(isGameOver)
      return;
    }
    if (humanChoice === "rock" && computerChoice === "scissor") {
      humanScore += 1;
      humanWon = true;
    } else if (humanChoice === "paper" && computerChoice === "rock") {
      humanScore += 1;
      humanWon = true;
    } else if (humanChoice === "scissor" && computerChoice === "paper") {
      humanScore += 1;
      humanWon = true;
    } else {
      computerScore += 1;
    }

    notification.innerHTML = `You ${humanWon ? "Win" : "Lose"}! ${humanChoice} ${humanWon ? "beats" : "can't beat"} ${computerChoice}`;
    let addClass = humanWon ? "win" : "lose";
    notificationAnimation(addClass).call(isGameOver);

  };

  let gameReset = () => {
    round = 0;
    humanScore = 0;
    computerScore = 0;

    playerAreaSpan.innerHTML = "";
    computerAreaSpan.innerHTML = "";

    humanSpanScore.innerHTML = "0";
    computerSpanScore.innerHTML = "0";

    endGame.style.display = "none";
    handSelectionArea.style.pointerEvents = "auto";
    for (let i = 0; i < handSelectionArea.children.length; i++) {
      handSelectionArea.children[i].classList.remove("disable");
    }
  };
  let handleClick = () => {
    handSelectionArea.style.display = "flex";
    playBtn.style.display = "none";
  };

  let handleHandChoice = (e) => {
    let humanSelection = getHumanChoice(e);
    let computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  };

  playBtn.addEventListener("click", handleClick);
  handSelectionArea.addEventListener("click", handleHandChoice);

  btnReset.addEventListener("click", gameReset);
});
