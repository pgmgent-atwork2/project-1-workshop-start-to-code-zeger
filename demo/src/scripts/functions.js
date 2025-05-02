let score = 0;
let isClicked = false;
let intervalDuration = 4000;
let intervalCountdown;

let leaderboard = [0, 0, 0, 0, 0];

function moveBall(onFinish) {
  const $ball = document.getElementById("ball");

  const maxX = window.innerWidth - $ball.offsetWidth;
  const maxY = window.innerHeight - $ball.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  $ball.animate(
    [{ transform: `translate(${randomX}px, ${randomY}px)` }],
    { duration: 1000, fill: "forwards" }
  ).onfinish = () => {
    $ball.style.transform = `translate(${randomX}px, ${randomY}px)`;
    onFinish?.();
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
}

function startInterval() {

  moveBall(() => {
    clearInterval(intervalCountdown);
    startIntervalTimer();
  });
}

function startIntervalTimer() {
  clearInterval(intervalCountdown);

  const $intervalTimer = document.getElementById("interval-timer");
  let timeLeft = intervalDuration;
  $intervalTimer.innerText = `Interval: ${(timeLeft / 1000).toFixed(2)}s`;

  intervalCountdown = setInterval(() => {
    timeLeft -= 10;
    if (timeLeft < 0) timeLeft = 0;
    $intervalTimer.innerText = `Interval: ${(timeLeft / 1000).toFixed(2)}s`;

    if (timeLeft <= 0) {
      clearInterval(intervalCountdown);
      gameOver();
    }
  }, 10);
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
  startIntervalTimer();
}

function updateLeaderboard() {
  const $leaderboardList = document.getElementById("leaderboard-list");
  $leaderboardList.innerHTML = leaderboard
    .map((score, index) => `<li><span>${index + 1}</span><span>${score}</span></li>`)
    .join('');
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