let score = 0;
let isClicked = false;
let intervalId;
let intervalDuration = 4000;

let leaderboard = [0, 0, 0, 0, 0];

function moveBall() {
  const $ball = document.getElementById('ball');

  const maxX = window.innerWidth - $ball.offsetWidth;
  const maxY = window.innerHeight - $ball.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  $ball.getAnimations().forEach(animation => animation.cancel());

  const animation = $ball.animate(
    [
      { transform: `translate(${randomX}px, ${randomY}px)` }
    ],
    { duration: 1000, fill: 'forwards' }
  );

  animation.onfinish = () => {
    $ball.style.transform = `translate(${randomX}px, ${randomY}px)`;
  };
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


function onBallClick(event) {
  event.stopPropagation();
  isClicked = true;
  score += 1;
  document.getElementById('score').innerText = `Score: ${score}`;

  intervalDuration = Math.max(1000, intervalDuration - 200);
  console.log(`Interval Duration Updated: ${intervalDuration}ms`);  

  moveBall();
  startInterval();
}

function onBackgroundClick() {
  const $board = document.getElementById('board');
  $board.animate(
    [
      { backgroundColor: 'red' },
      { backgroundColor: 'rgb(203, 203, 203)' }
    ],
    { duration: 400, easing: 'ease-in-out' }
  );
  gameOver();
}

function gameOver() {
  clearInterval(intervalId);
  const $gameOver = document.getElementById('game-over');
  const $board = document.getElementById('board');
  
  $gameOver.style.display = 'block';
  $board.classList.add('disabled');
  document.getElementById('end-score').innerText = `Score: ${score}`;
  
  const $ball = document.getElementById('ball');
  $ball.getAnimations().forEach(animation => animation.cancel());
  
  document.addEventListener('keydown', restartGame);
}

function restartGame(event) {
  if (event.code === 'Space') {
    document.removeEventListener('keydown', restartGame);
    const $gameOver = document.getElementById('game-over');
    const $board = document.getElementById('board');

    $gameOver.style.display = 'none';
    $board.classList.remove('disabled');
    score = 0;
    intervalDuration = 4000;
    document.getElementById('score').innerText = `Score: ${score}`;
    moveBall();
  }
}

function updateLeaderboard() {
  const $leaderboardList = document.getElementById('leaderboard-list');
  $leaderboardList.innerHTML = '';

  leaderboard.forEach((score, index) => {
    const li = document.createElement('li');
    
    const rankSpan = document.createElement('span');
    rankSpan.textContent = `${index + 1}`;

    const scoreSpan = document.createElement('span');
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

function init() {
  const $ball = document.getElementById('ball');
  const $board = document.getElementById('board');

  $ball.addEventListener('click', onBallClick);
  $board.addEventListener('click', onBackgroundClick);

  moveBall();
}

init();