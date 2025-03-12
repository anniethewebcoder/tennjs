// SETTING UP THE BLACK CANVAS
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

//SETTING UP THE BALL
const BALL_SIZE = 5;
let ballPosition = { x: 20, y: 30 };

// STARTER SPEED OF BALL
let xSpeed = 4;
let ySpeed = 2;

// DRAW FUNCTION
function draw() {
  // BLACK CANVAS
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // WHITE BALL
  ctx.fillStyle = "white";
  ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);
}

// UPDATE THE POSITION OF BALL
function update() {
  ballPosition.x += xSpeed;
  ballPosition.y += ySpeed;
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

  // WHEN POSITION OF BALL LEFT IS LESS THAN ZERO
  // WHEN POSITION OF BALL RIGHT IS GREATER THAN WIDTH OF CANVAS
  // THE BALL HITS THE LEFT OR RIGHT WALL
  if (ball.left < 0 || ball.right > width) {
    xSpeed = -xSpeed;
  }

  // WHEN POSITION OF BALL TOP IS LESS THAN ZERO
  // WHEN POSITION OF BALL RIGHT IS GREATER THAN HEIGHT OF CANVAS
  // THE BALL HITS THE TOP OR BOTTOM WALL
  if (ball.top < 0 || ball.bottom > height) {
    ySpeed = -ySpeed;
  }
}

// LOOPING BALL TO MAKE IT MOVE WITH 30MS
function gameLoop() {
  draw();
  update();
  checkCollision();

  // CALL THIS FUNCTION AGAIN AFTER A TIMEOUT
  setTimeout(gameLoop, 30);
}

// SET THE GAME IN MOTION
gameLoop();
