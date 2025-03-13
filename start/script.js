// SETTING UP THE BLACK CANVAS
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// SETTING UP LEFT PADDLE ROBOT
const MAX_COMPUTER_SPEED = 2;

//SETTING UP THE BALL
const BALL_SIZE = 5;
let ballPosition;
let xSpeed;
let ySpeed;

// STARTER OF THE BALL
function initBall() {
  ballPosition = { x: 20, y: 30 };
  xSpeed = 4;
  ySpeed = 2;
}

// SETTING UP THE PADDLES
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

// SETTING UP SCORES
let leftScore = 0;
let rightScore = 0;
let gameOver = false;

// SETTING UP MOUSE CONTROL OF THE RIGHT PADDLE
document.addEventListener("mousemove", (e) => {
  rightPaddleTop = e.y - canvas.offsetTop;
});

// DRAW FUNCTION
function draw() {
  // BLACK CANVAS
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // WHITE BALL
  ctx.fillStyle = "white";
  ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

  // PADDLES
  ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(
    width - PADDLE_WIDTH - PADDLE_OFFSET,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );

  // SCORES
  ctx.font = "30px monospace";
  ctx.textAlign = "left";
  ctx.fillText(leftScore.toString(), 50, 50);
  ctx.textAlign = "right";
  ctx.fillText(rightScore.toString(), width - 50, 50);
}

// LEFT PADDLE FOLLOWS BALL
function followBall() {
  let ball = {
    top: ballPosition.y,
    bottom: ballPosition.y + BALL_SIZE,
  };

  let leftPaddle = {
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  if (ball.top < leftPaddle.top) {
    leftPaddleTop -= MAX_COMPUTER_SPEED;
  } else if (ball.bottom > leftPaddle.bottom) {
    leftPaddleTop += MAX_COMPUTER_SPEED;
  }
}

// UPDATE THE POSITION OF BALL
function update() {
  ballPosition.x += xSpeed;
  ballPosition.y += ySpeed;
  followBall();
}

// CHECK WHEN BALL AND PADDLES COLLIDE
function checkPaddleCollision(ball, paddle) {
  // CHECK IF THE PADDLE AND BALL OVERLAP VERTICALLY AND HORIZONATALLY
  return (
    ball.left < paddle.right &&
    ball.right > paddle.left &&
    ball.top < paddle.bottom &&
    ball.bottom > paddle.top
  );
}

// BOUNCING NEAR THE PADDLE ENDS, CHANGE ANGLE OF BALL
function adjustAngle(distanceFromTop, distanceFromBottom) {
  if (distanceFromTop < 0) {
    // IF BALL HIT NEAR THE TOP OF THE PADDLE, REDUCE ySpeed
    ySpeed -= 0.5;
  } else if (distanceFromBottom < 0) {
    ySpeed += 0.5;
  }
}

// MAKE THE BALL BOUNCE AROUND CANVAS INSTEAD OF SHOOTING OFF
function checkCollision() {
  // OBJECT OF A BALL WITH PROPERTIES OF POSITION
  let ball = {
    left: ballPosition.x,
    right: ballPosition.x + BALL_SIZE,
    top: ballPosition.y,
    bottom: ballPosition.y + BALL_SIZE,
  };

  // LEFT PADDLE OBJECT
  let leftPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  // RIGHT PADDLE OBJECT
  let rightPaddle = {
    left: width - PADDLE_WIDTH - PADDLE_OFFSET,
    right: width - PADDLE_OFFSET,
    top: rightPaddleTop,
    bottom: rightPaddleTop + PADDLE_HEIGHT,
  };

  if (checkPaddleCollision(ball, leftPaddle)) {
    // LEFT PADDLE COLLISION HAPPENED
    let distanceFromTop = ball.top - leftPaddle.top;
    let distanceFromBottom = leftPaddle.bottom - ball.bottom;
    adjustAngle(distanceFromTop, distanceFromBottom);
    xSpeed = Math.abs(xSpeed);
  }

  if (checkPaddleCollision(ball, rightPaddle)) {
    // RIGHT PADDLE COLLISION HAPPENED
    let distanceFromTop = ball.top - rightPaddle.top;
    let distanceFromBottom = rightPaddle.bottom - ball.bottom;
    adjustAngle(distanceFromTop, distanceFromBottom);
    xSpeed = -Math.abs(xSpeed);
  }

  // WHEN BALL HIT LEFT WALL
  if (ball.left < 0) {
    rightScore++;
    initBall();
  }

  // WHEN BALL HIT RIGHT WALL
  if (ball.right > width) {
    leftScore++;
    initBall();
  }

  // CHECK TO SEE IF GAME IS OVER
  if (leftScore > 9 || rightScore > 9) {
    gameOver = true;
  }

  // WHEN POSITION OF BALL LEFT IS LESS THAN ZERO
  // WHEN POSITION OF BALL RIGHT IS GREATER THAN WIDTH OF CANVAS
  // THE BALL HITS THE LEFT OR RIGHT WALL
  // if (ball.left < 0 || ball.right > width) {
  //   xSpeed = -xSpeed;
  // }

  // WHEN POSITION OF BALL TOP IS LESS THAN ZERO
  // WHEN POSITION OF BALL RIGHT IS GREATER THAN HEIGHT OF CANVAS
  // THE BALL HITS THE TOP OR BOTTOM WALL
  if (ball.top < 0 || ball.bottom > height) {
    ySpeed = -ySpeed;
  }
}

// SETTING UP GAME OVER
function drawGameOver() {
  ctx.fillStyle = "white";
  ctx.font = "30px monospace";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", width / 2, height / 2);
}

// LOOPING BALL TO MAKE IT MOVE WITH 30MS
function gameLoop() {
  draw();
  update();
  checkCollision();

  if (gameOver) {
    draw();
    drawGameOver();
  } else {
    // CALL THIS FUNCTION AGAIN AFTER A TIMEOUT
    setTimeout(gameLoop, 30);
  }
}

// SET THE GAME IN MOTION
initBall();
gameLoop();
