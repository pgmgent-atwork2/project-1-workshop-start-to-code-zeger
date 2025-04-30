let score = 0;

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

function onBallClick(event) {
  event.stopPropagation();
  score += 1;
  document.getElementById('score').innerText = `Score: ${score}`;
  moveBall();
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