document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, CustomEase, CustomBounce);

  let rounds = 5;
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
  let imageChoices = {
    rock: "🪨",
    paper: "📃",
    scissor: "✂️",
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
    // tl.call(() => {
    //   areaSpan.innerHTML = choiceHand;
    //   humanSpanScore.innerHTML = humanScore;
    //   computerSpanScore.innerHTML = computerScore;
    // });
    return tl;
  };

  let handShowAnimation = (areaSpan, firstTl, choiceHand) => {
    let tl = gsap.timeline();
    tl.add(firstTl(areaSpan))
      .call(() => {
        areaSpan.innerHTML = choiceHand;
        humanSpanScore.innerHTML = humanScore;
        computerSpanScore.innerHTML = computerScore;
      })
      // .add(notificationAnimation());
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
    // playerAreaSpan.innerHTML = imageChoices[choice];
    return choice;
  };

  let getComputerChoice = () => {
    let rand = Math.floor(Math.random() * 3);
    let choice = handleSelection[rand];
    handShowAnimation(computerAreaSpan, handAnimation, imageChoices[choice]);
    return choice;
  };

  let notificationAnimation = (addClass) => {
    let tl = gsap.timeline({ pause: true,  });
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
    let humanWon = false;
    if (humanChoice === computerChoice) {
      notification.innerHTML = `It's a tie!`;
      notificationAnimation()
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
    let addClass = humanWon ? "win" : "lose";
    notificationAnimation(addClass)
  };
  let handleClick = () => {
    handSelectionArea.style.display = "flex";
  };

  let handleHandChoice = (e) => {
    let humanSelection = getHumanChoice(e);
    let computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  };

  playBtn.addEventListener("click", handleClick);
  handSelectionArea.addEventListener("click", handleHandChoice);

  //   for (let index = 0; index < rounds; index++) {
  //   }
});
