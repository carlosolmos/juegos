var theGame = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
	bird = null;
    carlitos = null;
     // bird gravity, will make bird fall if you don't flap
	birdGravity = 800;
     // horizontal bird speed
	birdSpeed = 125;
     // flap thrust
	birdFlapPower = 300;
     // milliseconds between the creation of two pipes
	pipeInterval = 2000;
     // hole between pipes, in puxels
	pipeHole = 180;
	pipeGroup = null;
	scoreText = null;
    topScore = 0;
    _timer =0;
};

theGame.prototype = {
  	create:function(){
        pipeGroup = this.game.add.group();
        score = 0;
        _timer = 0;
        topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
        scoreText = this.game.add.text(10,10,"-",{
            font:"bold 16px Arial"
        });
        this.updateScore();
        this.game.stage.backgroundColor = "#87CEEB";
        this.game.stage.disableVisibilityChange = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        carlitos = this.game.add.sprite(80,240,"carlitos");
        bird = this.game.add.sprite(80,240,"bird");
        bird.anchor.set(0.5);
        carlitos.anchor.set(0.5);
        this.game.physics.arcade.enable(bird);
        this.game.physics.arcade.enable(carlitos);
        bird.body.gravity.y = birdGravity;
        carlitos.body.gravity.y = birdGravity;
        this.game.input.onDown.add(this.flap, this);
        //this.game.time.events.loop(pipeInterval, this.addPipe); 
        this.addPipe();
    },
    
    update:function(){
        _timer++;
        if(_timer > birdSpeed){
          _timer = 0;
          this.addPipe();
         }
        this.game.physics.arcade.collide(bird, pipeGroup, this.die, null, this);
        if(bird.y>this.game.height){
            this.die();
        }	
    },
    
    updateScore: function(){
		scoreText.text = "Score: "+score+"\nBest: "+topScore;	
	},
     
	flap: function (){
		bird.body.velocity.y = -birdFlapPower;	
        carlitos.body.velocity.y = -birdFlapPower;	
	},
	
	addPipe: function (){
        this.updateScore();
		var pipeHolePosition = this.game.rnd.between(50,430-pipeHole);
		var upperPipe = new Pipe(this.game,320,pipeHolePosition-480,-birdSpeed);
		this.game.add.existing(upperPipe);
		pipeGroup.add(upperPipe);
		var lowerPipe = new Pipe(this.game,320,pipeHolePosition+pipeHole,-birdSpeed);
		this.game.add.existing(lowerPipe);
		pipeGroup.add(lowerPipe);
	},
	
	die: function (){
		localStorage.setItem("topFlappyScore",Math.max(score,topScore));	
		this.game.state.start("GameOver",true,false,score);		
	}
};

    
	
Pipe = function (game, x, y, speed) {
    Phaser.Sprite.call(this, game, x, y, "pipe");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.x = speed;
    this.giveScore = true;	
};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {
    if(this.x+this.width<bird.x && this.giveScore){
        score+=0.5;
        this.giveScore = false;
    }
    if(this.x<-this.width){
        this.destroy();
    }
};	
