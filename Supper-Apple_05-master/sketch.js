/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var trees_x;
var collectables;
var clouds;
var mountains;
var canyons;

var game_score;
var flagpole;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  // Initialise arrays of scenery objects.
  trees_x = [100, 300, 1400, 1000];
  collectables = [
    { x_pos: 400, size: 48, y_pos: floorPos_y - 100, isFound: false },
    { x_pos: 800, size: 48, y_pos: floorPos_y, isFound: false },
    { x_pos: 1300, size: 48, y_pos: floorPos_y - 100, isFound: false }
  ];
  clouds = [
    { x_pos: 200, y_pos: 200 },
    { x_pos: 600, y_pos: 100 },
    { x_pos: 800, y_pos: 200 }
  ];
  mountains = [
    { x_pos: -400, y_pos: 100 },
    { x_pos: -100, y_pos: 100 },
    { x_pos: 1000, y_pos: 100 }
  ];
  canyons = [
    { x_pos: -200, width: 100 },
    { x_pos: 1100, width: 100 },
    { x_pos: 1500, width: 100 }
  ];
  game_score = 0;

  flagpole = {
    isReached: false, x_pos: 2000
  };
}

function draw() {
  background(100, 155, 255); // fill the sky blue

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height / 4); // draw some green ground

  push();
  translate(scrollPos, 0);

  // Draw clouds.
  drawClouds();

  // Draw mountains.
  drawMountains();

  // Draw trees.
  drawTrees();

  // Draw canyons.
  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  // Draw collectable items.
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      drawCollectable(collectables[i]);
      checkCollectable(collectables[i]);
    }
  }

  renderFlagpole();

  pop();
  // Draw game character.

  drawGameChar();

  fill(255);
  noStroke();
  text("score: " + game_score, 20, 20);


  // Logic to make the game character move or the background scroll.
  if (isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

  if (isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  if (isPlummeting == true && gameChar_y == floorPos_y) {
    gameChar_y = floorPos_y - 150;
  }
  if (isFalling == true) {
    gameChar_y += 5;
  }

  if (gameChar_y < floorPos_y) {
    isFalling = true;
  } else if (gameChar_y == floorPos_y) {
    isFalling = false;
  }
  
  if(flagpole.isReached == false){
    checkFlagpole();
  }
  

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  console.log("press" + keyCode);
  console.log("press" + key);
  if (keyCode == 37) {
    isLeft = true;
  } else if (keyCode == 39) {
    isRight = true;
  }
  if (keyCode == 32) {
    isPlummeting = true;
    isFalling = false;
  }
}

function keyReleased() {
  console.log("release" + keyCode);
  console.log("release" + key);
  if (keyCode == 37) {
    isLeft = false;
  } else if (keyCode == 39) {
    isRight = false;
  }
  if (keyCode == 32) {
    isPlummeting = false;
    isFalling = true;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
  // draw game character
  strokeWeight(1);
  if (isLeft && isFalling) {
    // add your jumping-left code
    //hair
    fill(0);
    ellipse(gameChar_x + 2, gameChar_y - 54, 42, 33);
    //face
    fill(255, 227, 206);
    stroke(65);
    ellipse(gameChar_x, gameChar_y - 53, 22, 22);
    //eyes
    fill(255);
    stroke(65);
    ellipse(gameChar_x - 7, gameChar_y - 56, 10, 10);
    ellipse(gameChar_x - 8, gameChar_y - 54, 2, 2);
    //mouth
    line(gameChar_x - 6, gameChar_y - 46, gameChar_x - 2, gameChar_y - 46);
    //legs
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left leg
    rect(gameChar_x - 8, gameChar_y - 22, 6, 12, 2);
    //right leg
    rect(gameChar_x + 2, gameChar_y - 22, 12, 6, 2);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //right arm
    rect(gameChar_x, gameChar_y - 38, 17, 4, 2);

    //body
    fill(248, 123, 142);
    noStroke();
    rect(gameChar_x - 8, gameChar_y - 42, 15, 24, 5);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left arm
    rect(gameChar_x - 20, gameChar_y - 38, 17, 4, 2);
  } else if (isRight && isFalling) {
    // add your jumping-right code
    //hair
    fill(0);
    ellipse(gameChar_x - 2, gameChar_y - 54, 42, 33);
    //face
    fill(255, 227, 206);
    stroke(65);
    ellipse(gameChar_x, gameChar_y - 53, 22, 22);
    //eyes
    fill(255);
    stroke(65);
    ellipse(gameChar_x + 8, gameChar_y - 55, 8, 8);
    ellipse(gameChar_x + 8, gameChar_y - 54, 2, 2);
    //mouth
    line(gameChar_x + 6, gameChar_y - 46, gameChar_x + 2, gameChar_y - 46);
    //legs
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left leg
    rect(gameChar_x - 15, gameChar_y - 22, 12, 6, 2);
    //right leg
    rect(gameChar_x, gameChar_y - 22, 6, 12, 2);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left arm
    rect(gameChar_x - 20, gameChar_y - 38, 17, 4, 2);
    //body
    fill(248, 123, 142);
    noStroke();
    rect(gameChar_x - 8, gameChar_y - 42, 15, 24, 5, 2);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);

    //right arm
    rect(gameChar_x, gameChar_y - 38, 17, 4, 2);
  } else if (isLeft) {
    // add your walking left code
    //hair
    fill(0);
    ellipse(gameChar_x + 2, gameChar_y - 54, 42, 33);
    //face
    fill(255, 227, 206);
    stroke(65);
    ellipse(gameChar_x, gameChar_y - 53, 22, 22);
    //eyes
    fill(255);
    stroke(65);
    ellipse(gameChar_x - 7, gameChar_y - 56, 10, 10);
    ellipse(gameChar_x - 8, gameChar_y - 54, 2, 2);
    //mouth
    line(gameChar_x - 6, gameChar_y - 46, gameChar_x - 2, gameChar_y - 46);
    //legs
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left leg
    rect(gameChar_x - 8, gameChar_y - 15, 6, 12, 2);
    //right leg
    rect(gameChar_x, gameChar_y - 15, 6, 12, 2);
    //body
    fill(248, 123, 142);
    noStroke();
    rect(gameChar_x - 8, gameChar_y - 42, 15, 30, 5);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left arm
    //right arm
    rect(gameChar_x, gameChar_y - 38, 4, 17, 2);
  } else if (isRight) {
    // add your walking right code
    //hair
    fill(0);
    ellipse(gameChar_x - 2, gameChar_y - 54, 42, 33);
    //face
    fill(255, 227, 206);
    stroke(65);
    ellipse(gameChar_x, gameChar_y - 53, 22, 22);
    //eyes
    fill(255);
    stroke(65);
    ellipse(gameChar_x + 8, gameChar_y - 55, 8, 8);
    ellipse(gameChar_x + 8, gameChar_y - 54, 2, 2);
    //mouth
    line(gameChar_x + 6, gameChar_y - 46, gameChar_x + 2, gameChar_y - 46);
    //legs
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left leg
    rect(gameChar_x - 8, gameChar_y - 15, 6, 12, 2);
    //right leg
    rect(gameChar_x, gameChar_y - 15, 6, 12, 2);
    //body
    fill(248, 123, 142);
    noStroke();
    rect(gameChar_x - 8, gameChar_y - 42, 15, 30, 5);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left arm
    // rect(gameChar_x - 15, gameChar_y - 38, 4, 17);
    //right arm
    rect(gameChar_x - 4, gameChar_y - 38, 4, 17, 2);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    //hair
    fill(0);
    ellipse(gameChar_x, gameChar_y - 54, 42, 33);
    //face
    fill(255, 227, 206);
    stroke(65);
    ellipse(gameChar_x, gameChar_y - 53, 22, 22);
    //eyes
    fill(255);
    stroke(65);
    ellipse(gameChar_x - 8, gameChar_y - 55, 8, 8);
    ellipse(gameChar_x + 7, gameChar_y - 56, 10, 10);
    ellipse(gameChar_x - 8, gameChar_y - 54, 2, 2);
    ellipse(gameChar_x + 8, gameChar_y - 54, 2, 2);
    //mouth
    line(gameChar_x - 2, gameChar_y - 46, gameChar_x + 2, gameChar_y - 46);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left arm
    rect(gameChar_x - 15, gameChar_y - 55, 4, 17, 2);
    //right arm
    rect(gameChar_x + 10, gameChar_y - 55, 4, 17, 2);
    //left leg
    rect(gameChar_x - 9, gameChar_y - 22, 6, 12, 2);
    //right leg
    rect(gameChar_x + 2, gameChar_y - 22, 6, 12, 2);
    //body
    fill(248, 123, 142);
    noStroke();
    rect(gameChar_x - 9, gameChar_y - 42, 18, 24, 5);
  } else {
    // add your standing front facing code

    //hair
    fill(0);
    ellipse(gameChar_x, gameChar_y - 54, 42, 33);
    //face
    fill(255, 227, 206);
    stroke(65);
    ellipse(gameChar_x, gameChar_y - 53, 22, 22);
    //eyes
    fill(255);
    stroke(65);
    ellipse(gameChar_x - 8, gameChar_y - 55, 8, 8);
    ellipse(gameChar_x + 7, gameChar_y - 56, 10, 10);
    ellipse(gameChar_x - 8, gameChar_y - 54, 2, 2);
    ellipse(gameChar_x + 8, gameChar_y - 54, 2, 2);
    //mouth
    line(gameChar_x - 2, gameChar_y - 46, gameChar_x + 2, gameChar_y - 46);
    //arms
    fill(255, 227, 206);
    stroke(65);
    strokeWeight(1);
    //left arm
    rect(gameChar_x - 15, gameChar_y - 38, 4, 17, 2);
    //right arm
    rect(gameChar_x + 10, gameChar_y - 38, 4, 17, 2);
    //left leg
    rect(gameChar_x - 9, gameChar_y - 15, 6, 12, 2);
    //right leg
    rect(gameChar_x + 2, gameChar_y - 15, 6, 12, 2);
    //body
    fill(248, 123, 142);
    noStroke();
    rect(gameChar_x - 9, gameChar_y - 42, 18, 30, 5);
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    fill(255, 255, 255);
    rect(clouds[i].x_pos + 100, clouds[i].y_pos - 25, 199, 50, 25, 25, 25, 25);

    ellipse(clouds[i].x_pos + 170, clouds[i].y_pos - 18, 72, 72);
    ellipse(clouds[i].x_pos + 218, clouds[i].y_pos - 14, 72, 72);
  }
}

// Function to draw mountains objects.
function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    fill(125, 139, 124);
    triangle(
      mountains[i].x_pos + 547,
      mountains[i].y_pos + 53,
      mountains[i].x_pos + 386,
      mountains[i].y_pos + 332,
      mountains[i].x_pos + 709,
      mountains[i].y_pos + 332
    );
    fill(156, 165, 155);
    triangle(
      mountains[i].x_pos + 650,
      mountains[i].y_pos + 8,
      mountains[i].x_pos + 356,
      mountains[i].y_pos + 332,
      mountains[i].x_pos + 894,
      mountains[i].y_pos + 332
    );
    fill(100, 124, 88);
    triangle(
      mountains[i].x_pos + 655,
      mountains[i].y_pos + 117,
      mountains[i].x_pos + 527,
      mountains[i].y_pos + 332,
      mountains[i].x_pos + 814,
      mountains[i].y_pos + 332
    );
    fill(120, 147, 107);
    triangle(
      mountains[i].x_pos + 545,
      mountains[i].y_pos + 172,
      mountains[i].x_pos + 393,
      mountains[i].y_pos + 332,
      mountains[i].x_pos + 635,
      mountains[i].y_pos + 332
    );
  }
}
// Function to draw trees objects.
function drawTrees() {
  for (var i = 0; i < trees_x.length; i++) {
    fill(137, 103, 27);
    rect(trees_x[i], floorPos_y - 86, 19, 87);
    fill(188, 222, 111);
    triangle(
      trees_x[i] + 10,
      floorPos_y - 250,
      trees_x[i] - 50,
      floorPos_y - 56,
      trees_x[i] + 10,
      floorPos_y - 56
    );
    fill(138, 195, 61);
    triangle(
      trees_x[i] + 10,
      floorPos_y - 250,
      trees_x[i] + 10,
      floorPos_y - 56,
      trees_x[i] + 69,
      floorPos_y - 56
    );
    fill(137, 103, 27);
    rect(trees_x[i] + 50, floorPos_y - 59, 10, 59);
    fill(188, 222, 111);
    triangle(
      trees_x[i] + 56,
      floorPos_y - 169,
      trees_x[i] + 56,
      floorPos_y - 37,
      trees_x[i] + 16,
      floorPos_y - 37
    );
    fill(138, 195, 61);
    triangle(
      trees_x[i] + 56,
      floorPos_y - 169,
      trees_x[i] + 96,
      floorPos_y - 37,
      trees_x[i] + 56,
      floorPos_y - 37
    );
  }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
  fill(75, 80, 82);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, floorPos_y);
  fill(168, 167, 186);
  triangle(
    t_canyon.x_pos + t_canyon.width / 6,
    floorPos_y + 40,
    t_canyon.x_pos,
    height,
    t_canyon.x_pos + t_canyon.width / 3,
    height
  );
  triangle(
    t_canyon.x_pos + t_canyon.width / 2,
    floorPos_y + 40,
    t_canyon.x_pos + t_canyon.width / 3,
    height,
    t_canyon.x_pos + (t_canyon.width / 3) * 2,
    height
  );
  triangle(
    t_canyon.x_pos + (t_canyon.width / 6) * 5,
    floorPos_y + 40,
    t_canyon.x_pos + (t_canyon.width / 3) * 2,
    height,
    t_canyon.x_pos + (t_canyon.width / 3) * 3,
    height
  );
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
  if (
    gameChar_world_x > t_canyon.x_pos &&
    gameChar_world_x < t_canyon.x_pos + t_canyon.width &&
    gameChar_y >= floorPos_y
  ) {
    isFalling = true;
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {
  fill(186, 51, 51);
  noStroke();
  ellipse(
    t_collectable.x_pos + 14,
    t_collectable.y_pos - 20,
    t_collectable.size - 19,
    t_collectable.size - 11
  );
  ellipse(
    t_collectable.x_pos + 30,
    t_collectable.y_pos - 20,
    t_collectable.size - 19,
    t_collectable.size - 11
  );
  stroke(88, 70, 70);
  strokeWeight(3);

  line(
    t_collectable.x_pos + 30,
    t_collectable.y_pos - 42,
    t_collectable.x_pos + 22,
    t_collectable.y_pos - 32
  );
}

// Function to check character has collected an item.

function checkCollectable(t_collectable) {
  if (
    dist(
      gameChar_world_x,
      gameChar_y,
      t_collectable.x_pos + 10,
      t_collectable.y_pos
    ) < 30
  ) {
    t_collectable.isFound = true;
    game_score +=1;
  }
}

function renderFlagpole(){
  push();
  strokeWeight(5);
  stroke(100);
  line(flagpole.x_pos, floorPos_y,flagpole.x_pos, floorPos_y - 250,);
  fill(186, 51, 51);
  noStroke();

  if(flagpole.isReached){
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  }
  else{
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50)
  };

  pop();
}

function checkFlagpole (){
var d = abs(gameChar_world_x - flagpole.x_pos);
if( d < 15){
  flagpole.isReached = true;
}
}
