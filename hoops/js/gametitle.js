var gameTitle = function(game){}
var cielo = null;
var backsound = null;
var sounds = null;

gameTitle.prototype = {
  	create: function(){
       
        cielo = this.game.add.tileSprite(0, 0, 
                                            320, 
                                             this.game.cache.getImage('cielo').height, 
                                             'cielo');
        
		var gameTitle = this.game.add.sprite(160,160,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        backsound = this.game.add.audio('backsound');
        sounds = [ backsound ];
        this.game.sound.setDecodedCallback(sounds, this.startSound, this);
	},
	playTheGame: function(){
        //start the game
		this.game.state.start("TheGame");
	},
    update: function(){
         cielo.tilePosition.x -= 1;
         
    },
    startSound: function() {
        backsound.loopFull(0.6);
    }
}