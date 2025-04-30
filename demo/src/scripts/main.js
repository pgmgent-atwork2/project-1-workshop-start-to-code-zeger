let score = 0;
let isClicked = false;
let intervalId;
let intervalDuration = 4000;

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
      score -= 1;
      document.getElementById('score').innerText = `Score: ${score}`;
      moveBall();
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
  score -= 1;
  document.getElementById('score').innerText = `Score: ${score}`;
}

function init() {
  const $ball = document.getElementById('ball');
  const $board = document.getElementById('board');

  $ball.addEventListener('click', onBallClick);
  $board.addEventListener('click', onBackgroundClick);

  moveBall();
}

init();