var gameOver = function(game){}
var currentScore = null;

gameOver.prototype = {
	init: function(score){
		
	},
  	create: function(){
        var cielo2 = this.game.add.sprite(0, 0,'cielo2');
  		var gameOverTitle = this.game.add.sprite(160,160,"gameover");
        currentScore =  this.game.add.text(10,10,"-",{
            font:"bold 16px Arial"
        });
        currentScore.text = "Score: "+score+"\nBest: "+topScore;	
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        
        
      
	},
	playTheGame: function(){
		this.game.state.start("TheGame",true,false);
	}
}