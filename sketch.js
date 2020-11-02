var trex , trex_running, trex_collided, ground, invisible_ground, gameOver, restart, score, obstacle_group, cloud_group, gameState, cloud, obstacle, select_obstacle ; 

function preload () {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png") ; 
  ground_image = loadImage("ground2.png"); 
  cloud_image = loadImage("cloud.png") ; 
  gameOver_image = loadImage("gameOver.png") ; 
  restart_image = loadImage("restart.png") ; 
  obstacle1_image = loadImage("obstacle1.png") ; 
  obstacle2_image = loadImage("obstacle2.png") ; 
  obstacle3_image = loadImage("obstacle3.png") ; 
  obstacle4_image = loadImage("obstacle4.png") ;
  obstacle5_image = loadImage("obstacle5.png") ;
  obstacle6_image = loadImage("obstacle6.png") ; 
}

function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50,180,20,50) ; 
  trex.scale = 0.5 ; 
  trex.addAnimation("running" , trex_running) ;
  trex.addAnimation("colliding" , trex_collided) ; 
  
  ground = createSprite(300,180,600,20);
  ground.addImage("ground", ground_image);
  ground.velocityX = -7 ; 
  ground.x = ground.width/2 ; 
  
  invisible_ground = createSprite(300,185,600,20) ; 
  invisible_ground.visible = false ; 
  
  obstacle_group = createGroup () ; 
  cloud_group = createGroup () ; 
  
  gameState = "play" ;
  
  restart = createSprite(300,100,20,20) ;
  restart.addImage("restart1" , restart_image) ; 
  restart.visible = false ; 
  
  gameOver = createSprite(300,110,20,20) ; 
  gameOver.addImage("gameOver1" , gameOver_image) ; 
  gameOver.visible = false ; 
}

function draw() {

background("black") ;
  
trex.collide(invisible_ground) ; 

if(gameState === "play") { 
  
trex.changeAnimation("running" , trex_running) ; 
  
spawn_clouds () ; 

spawn_obstacles () ; 
  
  
if(ground.x < 0) {
  ground.x = ground.width/2; 
}
  

  
if(keyDown("space")) {
   trex.velocityY = -10 ; 
   }
trex.velocityY = trex.velocityY + 0.8 ; 

if(obstacle_group.isTouching(trex)) {
  gameState = "end" ; 
}
console.log("1") ; 
}
if(gameState === "end") {
ground.velocityX = 0 ; 
obstacle_group.setVelocityXEach(0) ; 
cloud_group.setVelocityXEach(0) ; 
cloud_group.setLifetimeEach(frameCount) ;  
obstacle_group.setLifetimeEach(frameCount) ; 
restart.visible = true ;
gameOver.visible = true ; 
trex.changeAnimation("colliding" , trex_collided) ; 
}

drawSprites();

}
  
  


function spawn_clouds () {
if(frameCount%80 === 0) {
var cloud = createSprite(600,100,20,20) ; 
cloud.addImage("cloud" , cloud_image) ; 
cloud.velocityX = - 2 ; 
cloud.scale = 0.5 ; 
cloud.y = random(50,150) ; 
trex.depth = cloud.depth ; 
trex.depth = trex.depth + 1 ; 
cloud_group.add(cloud) ; 
cloud_group.setLifetimeEach(300) ; 
}  

}

function spawn_obstacles () {
if(frameCount%120 === 0) {
var obstacle = createSprite(600,180,20,20) ; 
obstacle.velocityX = -2  ;
obstacle.scale = 0.5 ; 
var random1 = Math.round(random(1,6)) ; 
switch(random1) 
{
  case 1: obstacle.addImage("test",obstacle1_image) ; 
  break ; 
  
  case 2:obstacle.addImage("test1",obstacle2_image) ; 
  break ; 
  
  case 3:obstacle.addImage("test2",obstacle3_image) ; 
  break ; 
  
  case 4:obstacle.addImage("test3",obstacle4_image) ; 
  break ; 
  
  case 5:obstacle.addImage("test4",obstacle5_image) ; 
  break ; 
  
  case 6:obstacle.addImage("test5",obstacle6_image) ; 
  break ; 
  default:break ; 
  
  
}
obstacle_group.add(obstacle) ; 
obstacle_group.setLifetimeEach(300) ; 

}
  
function restart () { 
if(mouse.isPressedOver(restart)) {
gameState = "play" ;
  trex.changeAnimation("running" , trex_running") ; 

}



}