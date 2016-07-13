// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
 var score = 0;
 var labelScore;
 var player;
 var pipes = [];
 var splashDisplays = [];
 var tileSprite;
function preload(){
   game.load.image("playerImg", "../assets/flappy.png  ");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe.png");
game.load.image("cityscape","../assets/purplecityscape.png");

}

/*
 * Initialises the game. This function is only called once.
 */
 function create() {
game.stage.setBackgroundColor("#c6c6eb");
game.paused = true;
 //game.add.sprite(10, 360, "playerImg");
 game.input.keyboard
      .addKey(Phaser.Keyboard.ENTER)
      .onDown.add(start);
tileSprite = game.add.tileSprite(0,0,790,400,"cityscape");
splashDisplays.push( game.add.text(100,145, "Press ENTER to start, SPACEBAR to jump",{font: "30px Comic Sans MS", fill: "#FFFFFF"}) );
splashDisplays.push( game.add.text(300, 100, "START GAME",{font: "30px Comic Sans MS", fill: "#FFFFFF"}) );


    // set the background colour of the scene
}
//alert (score);
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

  game.physics.arcade.overlap(player,   pipes,   gameOver);
      if (player.y < 0 || player.y > 400){
      gameOver();
      }
  player.rotation = Math.atan(player.body.velocity.y / 200);
}

function gameOver() {
    score = 0;
    game.state.restart();
}


function clickHandler(event) {

}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore() {
	score = score + 1;
}

function moveRight() {
	player.x = player.x + 15;
}

function moveLeft() {
	player.x = player.x - 15;
}

function moveUp() {
	player.y = player.y - 15;
}

function moveDown() {
	player.y = player.y + 15;
}


function playerJump() {
    player.body.velocity.y = -200;
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipeBlock");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}

function generatePipe(){
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count=0; count<8; count=count+1) {
        if(count != gapStart && count != gapStart + 1) {
            addPipeBlock(800, count * 50);
        }
    }
}

function start(){
   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.add.text(290, 15, "Flap Your Bird", {font: "30px Comic Sans MS", fill: "#FFFFFF"});
   labelScore = game.add.text(score.toString());
   game.input.onDown.add(clickHandler);
   game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(spaceHandler);
   player = game.add.sprite(100, 200, "playerImg");
   player.anchor.setTo(0.5, 0.5);
   game.physics.arcade.enable(player);
   player.body.gravity.y = 200;
   player.body.velocity.x = 0;
   player.body.gravity.y = 300;
   game.input.keyboard
       .addKey(Phaser.Keyboard.SPACEBAR)
       .onDown
       .add(playerJump);
   generatePipe();
       var pipeInterval = 1.75 * Phaser.Timer.SECOND;
       game.time.events.loop(
           pipeInterval,
           generatePipe
       );
    game.paused = false;
    splashDisplays.forEach(function(x){
      x.destroy();
    });
    tileSprite.autoScroll(-40,0);
}
