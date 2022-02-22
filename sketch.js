var PLAY = 1;
var END = 0;
var gameState = PLAY;


var scooby,scoobyRunning,scoobyCollided
var covidGroup,covid1,covid2,coivd3
var backgroundImg
var ground,invisibleGround,groundImg
var score =0;

var gameOver,restart;

function preload(){
backgroundImg = loadImage("BACKGROUND.jpg");

scoobyRunning = loadAnimation("Scooby2.png","SCOOBY1.png");
scoobyCollided = loadImage("SCOOBY3.png");

groundImg = loadImage("groundImg.png");

covid1 = loadImage("COVID19Evil1.png");
covid2 = loadImage("COVID19Evil2.png");
covid3 = loadImage("Covid19Evil3.png");

gameOver = loadImage("GAMEOVER.png",)
restart = loadImage("Restart.jpg")
}

function setup() {
createCanvas(windowWidth, windowHeight);

    scooby = createSprite(51,height-68,22,49);
  
  
    scooby.addAnimation("running", scoobyRunning);
    scooby.addAnimation("collided", scoobyCollided);
    scooby.setCollider('circle',0,0,350)
    scooby.scale = 0.09;
    
    invisibleGround = createSprite(width/2,height-10,width,125);  
    invisibleGround.shapeColor = "#f4cbaa";
    
    ground = createSprite(width/2,height,width,2);
    ground.addImage("ground",groundImg);
    ground.x = width/2
    ground.velocityX = -(6 + 3*score/100);
    
    gameOver = createSprite(width/2,height/2- 50);
    gameOver.addImage(gameOver);
    
    restart = createSprite(width/2,height/2);
    restart.addImage(restart);
    
    gameOver.scale = 0.6;
    restart.scale = 0.1;
  
    gameOver.visible = false;
    restart.visible = false;
    
  
    covidGroup = new Group();
    
    score = 0;
  }
  
  function draw() {
    background(backgroundImg);
    textSize(25);
    fill("black")
    text("Score: "+ score,30,50);
    
    
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      ground.velocityX = -(6 + 3*score/100);
      
      if((touches.length > 0 || keyDown("SPACE")) && scooby.y  >= height-120) {
        scooby.velocityY = -10;
         touches = [];
      }
      
      scooby.velocityY = scooby.velocityY + 0.8
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
      scooby.collide(invisibleGround);
      spawncovid();
      
    
      if(covidGroup.isTouching(scooby)){
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      ground.velocityX = 0;
      scooby.velocityY = 0;
      covidGroup.setVelocityXEach(0);
      

      scooby.changeAnimation("collided",scoobyCollided);
      
      covidGroup.setLifetimeEach(-1);
      
      
      if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
        reset();
        touches = []
      }
    }
    
    
    drawSprites();
  }
  

  
  function spawncovid() {
    if(frameCount % 60 === 0) {
      var covid = createSprite(600,height-95,20,30);
      covid.setCollider('circle',0,0,45)
    
      covid.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: covid.addImage(covid1);
                break;
        case 2: covid.addImage(covid2);
                break;
        default: break;
      }
      
       
      covid.scale = 0.3;
      covid.lifetime = 300;
      covid.depth = trex.depth;
      covid.depth +=1;
    
      covidGroup.add(covid);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    covidGroup.destroyEach();
    
    scooby.changeAnimation("running",scoobyRunning);
    
    score = 0;} 