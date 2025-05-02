function onBallClick(event) {
  event.stopPropagation();
  isClicked = true;
  clearInterval(intervalCountdown);
  updateScore();
  updateIntervalDuration();
  startInterval();
}

function onBackgroundClick() {
  animateBoardFlash("red", "rgb(203, 203, 203)");
  gameOver();
}

function gameOver() {
  clearInterval(intervalCountdown);
  handleGameOverDisplay();
  checkLeaderboard();
  document.addEventListener("keydown", restartGame);
}

function restartGame(event) {
  if (event.code === "Space") {
    document.removeEventListener("keydown", restartGame);
    handleGameRestart();
  }
}

function init() {
  const $ball = document.getElementById("ball");
  const $board = document.getElementById("board");

  $ball.addEventListener("click", onBallClick);
  $board.addEventListener("click", onBackgroundClick);

  moveBall();
  updateLeaderboard();
}

init();
