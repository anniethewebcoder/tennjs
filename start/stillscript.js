let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, width, height);

const BALL_SIZE = 5;
let ballPosition = { x: 20, y: 30 };

// ctx.fillStyle = "white";
// ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

let xSpeed = 4;
let ySpeed = 2;

const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

document.addEventListener("mousemove", (e) => {
  rightPaddleTop = e.y - canvas.offsetTop;
});

function draw() {
  // FILL THE CANVAS WITH BLACK
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // EVERYTHING ELSE WILL BE WHITE
  ctx.fillStyle = "white";

  // DRAW THE BALL
  ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

  // DRAW THE PADDLES
  ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT);

  ctx.fillRect(
    width - PADDLE_WIDTH - PADDLE_OFFSET,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
}

function update() {
  ballPosition.x += xSpeed;
  ballPosition.y += ySpeed;
}

function checkPaddleCollision(ball, paddle) {
  // CHECK IF THE PADDLE AND BALL OVERLAP VERTICALLY AND HORIZONTALLY
  return (
    ball.left < paddle.right &&
    ball.right > paddle.left &&
    ball.top < paddle.bottom &&
    ball.bottom > paddle.top
  );
}

function adjustAngle(distanceFromTop, distanceFromBottom) {
  if (distanceFromTop < 0) {
    //IF BALL HIT NEAR TOP OF PADDLE, REDUCE ySpeed
    ySpeed -= 0.5;
  } else if (distanceFromBottom < 0) {
    // IF BALL HIT NEAR BOTTOM OF PADDLE, INCREASE ySpeed
    ySpeed += 0.5;
  }
}

function checkCollision() {
  let ball = {
    left: ballPosition.x,
    right: ballPosition.x + BALL_SIZE,
    top: ballPosition.y,
    bottom: ballPosition.y + BALL_SIZE,
  };

  let leftPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  let rightPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: rightPaddleTop,
    bottom: rightPaddleTop + PADDLE_HEIGHT,
  };

  //   if (checkPaddleCollision(ball, paddle)) {
  //     // LEFT PADDLE COLLISION HAPPENED
  //     let distanceFromTop = ball.top - leftPaddle.top;
  //     let distanceFromBottom = leftPaddle.bottom - ball.bottom;
  //     adjustAngle(distanceFromTop, distanceFromBottom);
  //     xSpeed = Math.abs(xSpeed);
  //   }

  if (checkPaddleCollision(ball, paddle)) {
    // RIGHT PADDLE COLLISION HAPPENED
    let distanceFromTop = ball.top - rightPaddle.top;
    let distanceFromBottom = rightPaddle.bottom - ball.bottom;
    adjustAngle(distanceFromTop, distanceFromBottom);
    ySpeed = -Math.abs(ySpeed);
  }

  if (ball.left < 0 || ball.right > width) {
    xSpeed = -xSpeed;
  }

  if (ball.top < 0 || ball.bottom > height) {
    ySpeed = -ySpeed;
  }
}

function gameLoop() {
  draw();
  update();
  checkCollision();

  // CALL THIS FUNCTION AGAIN AFTER A TIMEOUT
  setTimeout(gameLoop, 30);
}

// draw();

gameLoop();
