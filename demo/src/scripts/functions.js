let score = 0;
let isClicked = false;
let intervalId;
let intervalDuration = 4000;

let leaderboard = [0, 0, 0, 0, 0];

function moveBall() {
  const $ball = document.getElementById("ball");

  const maxX = window.innerWidth - $ball.offsetWidth;
  const maxY = window.innerHeight - $ball.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  $ball.getAnimations().forEach((animation) => animation.cancel());

  const animation = $ball.animate(
    [{ transform: `translate(${randomX}px, ${randomY}px)` }],
    { duration: 1000, fill: "forwards" }
  );

  animation.onfinish = () => {
    $ball.style.transform = `translate(${randomX}px, ${randomY}px)`;
  };
}

function animateBoardFlash(colorStart, colorEnd, duration = 400) {
  const $board = document.getElementById("board");
  $board.animate(
    [{ backgroundColor: colorStart }, { backgroundColor: colorEnd }],
    { duration, easing: "ease-in-out" }
  );
}

function updateScore() {
  score += 1;
  document.getElementById("score").innerText = `Score: ${score}`;
}

function decreaseScore() {
  score -= 1;
  document.getElementById("score").innerText = `Score: ${score}`;
}

function updateIntervalDuration() {
  intervalDuration = Math.max(1000, intervalDuration - 200);
  console.log(`Interval Duration Updated: ${intervalDuration}ms`);
}

function startInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (!isClicked) {
      gameOver();
    } else {
      isClicked = false;
    }
  }, intervalDuration);
}

function handleGameRestart() {
  const $gameOver = document.getElementById("game-over");
  const $board = document.getElementById("board");

  $gameOver.style.display = "none";
  $board.classList.remove("disabled");
  score = 0;
  intervalDuration = 4000;
  document.getElementById("score").innerText = `Score: ${score}`;
  updateLeaderboard();
  moveBall();
}

function updateLeaderboard() {
  const $leaderboardList = document.getElementById("leaderboard-list");
  $leaderboardList.innerHTML = "";

  leaderboard.forEach((score, index) => {
    const li = document.createElement("li");

    const rankSpan = document.createElement("span");
    rankSpan.textContent = `${index + 1}`;

    const scoreSpan = document.createElement("span");
    scoreSpan.textContent = score;

    li.appendChild(rankSpan);
    li.appendChild(scoreSpan);
    $leaderboardList.appendChild(li);
  });
}

function checkLeaderboard() {
  if (score > leaderboard[4]) {
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 5);
    updateLeaderboard();
  }
}

function handleGameOverDisplay() {
  const $gameOver = document.getElementById("game-over");
  const $board = document.getElementById("board");

  $gameOver.style.display = "block";
  $board.classList.add("disabled");
  document.getElementById("end-score").innerText = `Score: ${score}`;
}


document.addEventListener("mousemove", (event) => {
  const customCursor = document.getElementById("custom-cursor");
  customCursor.style.left = `${event.clientX}px`;
  customCursor.style.top = `${event.clientY}px`;
});