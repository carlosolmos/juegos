var preload = function (game) { }
preload.prototype = {
	preload: function() { 
        //loading bar.
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        
        //preload assets

		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("play","assets/play.png");		
        this.game.load.image("cielo","assets/nubes.png");
        this.game.load.image("cielo2","assets/nubes.png");
		
        this.game.load.image("gameover","assets/gameover.png");
        
        
        this.game.load.image("bird", "assets/bird.png"); 
        this.game.load.image("carlitos", "assets/carlitosply.png");
		this.game.load.image("pipe", "assets/pipe.png");
        
        this.game.load.audio('backsound', 'assets/score1.mp3');
        
	},
  	create: function(){
        //go to game title screen
		this.game.state.start("GameTitle");
    
	}
}