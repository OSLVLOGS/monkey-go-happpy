
var monkey,monkey_running,ground;

var banana, obstacle;

var obstacelImage, bananaImage;

var FoodGroup, obstacleGroup;

var bgi, bg

var score = 0;

var PLAY = 1;
var END = 0;
var survivaltime = 0;
var gameState = PLAY;


function preload(){
  
//loading Monkey Animation
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");         

//loading BananaImage
bananaImage = loadImage("banana.png");

//loading obstacleImage
obstacelImage=loadImage("obstacle.png");
  
bgi = loadImage("jungle.jpg");

 
}



function setup() {
  
//creating Canvas
  
createCanvas(450, 200);
  
//Createing Ground
  
ground = createSprite(300, 190, 300, 5);
ground.scale = 2;
//ground.velocityX = -2;
  
//Creating Monkey
  
monkey = createSprite(60, 120, 20, 20);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.1;
 

monkey.debug = true;


  
//Making Groups
obstacleGroup = new Group();
FoodGroup = new Group();
  
bg = createSprite(0, 0 , 450, 200);
bg.addImage(bgi);
bg.velocityX = -2;


  
}
  


function draw() {
  
//Giving Background
background("white");
  
//Displaying score

  survivaltime = Math.round(frameCount/frameRate());
  
if (gameState == PLAY) {

//Making monkey colide to the ground
   
monkey.collide(ground);   
  
//making infinite ground

if (bg.x<=150) {
  
  bg.x = bg.width/2;
  
}
  
//Making monkey jump

if (keyDown("space") && monkey.y>=150) {
  
  monkey.velocityY = -12;
  
}
  
//adding Gravity
  
monkey.velocityY = monkey.velocityY+0.8;
  
creatingObstacle();
CreateingBanana();
  
//Making banana Group Functional
if (FoodGroup.isTouching(monkey)) {
  
  FoodGroup.destroyEach();
  score = score+1;
  
}
  
  
  switch(score){
    case 10: monkey.scale = 0.12;
         break;
    case 20: monkey.scale = 0.14;
          break;
    case 30: monkey.scale = 0.16;
          break;
    case 40: monkey.scale = 0.18;
          break;
      default: break;
      
  }
  
//Making obstacle functiional
if (obstacleGroup.isTouching(monkey)) {
  monkey.scale = 0.08;
  gameState = END
  
 }
} 
  
else if (gameState==END){
 
 //Giving Lifetime
 obstacleGroup.setLifetimeEach(-1);
 FoodGroup.setLifetimeEach(-1);
  
  //Giving velocity as 0
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0)
  ground.velocityX = 0;
  monkey.velocityY = 0;
  bg.velocityX = 0;
 
  
  if (keyDown("r") && gameState==END) {
    
    console.log("hi");
    gameState = PLAY;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    score = 0;
    
  }

  
}
  
drawSprites();
  
  text("Score:"+ score, 50, 50);
  
text("Survivaltime:"+ survivaltime, 300, 50);
  
 }

function creatingObstacle() {
  
if (frameCount % 140==0){
  
  //creating obstacle
  var obstacle = createSprite(500, 165, 30, 03);
  obstacle.addImage(obstacelImage);
  
  //Making obstacles come randomly
  obstacle.x = Math.round(random(600, 600));
  
  //Giving Lifetime, velocity & size to obatcles
  obstacle.scale = 0.1;
  obstacle.velocityX = -4;
  obstacle.lifetime = 160;
  
  //Increasing monkey's depth than obstacles
  monkey.depth = obstacle.depth;
  monkey.depth = monkey.depth+1;
  
  obstacle.setCollider("circle", 0, 0, 100);
  obstacle.debug = true;
  
  //Mking obstacle Group
  obstacleGroup.add(obstacle);
  
  
 }
}
  
function CreateingBanana() {
  
  if (frameCount % 150==0) {
    
    //createing banana
    var banana = createSprite(500, 90, 0 ,0);
    banana.addImage(bananaImage);
    
    //Making banana come randomly
    banana.x = Math.round(random(600, 600));
    
  //Giving Lifetime, velocity & size to banana
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 160;
    
  //Increasing banana's depth than obstacles
  monkey.depth = banana.depth;
  monkey.depth = monkey.depth+1;
    
  //Making banana Group
  FoodGroup.add(banana);
    
 }
}
