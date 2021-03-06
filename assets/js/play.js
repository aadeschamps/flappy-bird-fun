var GAME = GAME || {};

Play = function(){
}

Play.prototype.init = function(){
  this.game.renderer.renderSession.roundPixels = true;
  this.game.world.setBounds(0, 0, GAME.width, GAME.height)
  this.physics.startSystem(Phaser.Physics.ARCADE)
  this.physics.arcade.gravity.y = 600;
  this.cursors = this.input.keyboard.createCursorKeys();
  this.keys = {
    jump: GAME.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  };
}

Play.prototype.preload = function(){
  this.load.spritesheet('flappy', './assets/images/flappy.png', 92, 66);
  this.load.image('pipe', './assets/images/pipe.png');
  this.load.image('bg-tile', './assets/images/bg.png');
  this.load.image('top pipe', './assets/images/top_pipe.png')
}

Play.prototype.create = function(){
  this.bgtile = this.add.tileSprite(0, 0, GAME.width, GAME.height, 'bg-tile');
  // Creating the player and scaling for screen
  this.flappy = this.add.sprite(200, 100, 'flappy')
  this.flappy.scale.set(.4, .4);
  // adds flapping animation for player
  this.flappy.animations.add("flap", [2, 1, 0, 1], 10, false)
  this.flappy.frame = 1;
  // enable physics for player
  this.physics.arcade.enable(this.flappy);
  this.flappy.body.velocity.x = 0;
  this.flappy.body.collideWorldBounds = true;
  // sets standard x velocity
  // this.flappy.body.velocity.x = 200;

  // create pipes group
  this.pipes = this.add.group();
  this.pipes.enableBody = true;
  var that = this;
  this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, function(){
    that.spawnPipe(that.pipes, that);
  })
  // this.spawnPipe(this.pipes, this);
  
  
  // console.log(this.physics.arcade.overlap);
  // this.pipes.setAll('allowGravity', false);  
}

Play.prototype.spawnPipe = function(group, that){
  console.log('hey');
  var ranHeight = that.rnd.integerInRange(GAME.height * .5, GAME.height * .8);
  var ranDiff = that.rnd.integerInRange(30, 60);
  var oppHeight = ranHeight - GAME.height + ranDiff;
  var pipe1 = that.pipes.create(600, ranHeight, 'pipe');
  pipe1.body.allowGravity = false;
  pipe1.scale.setTo(.55, .55);
  pipe1.body.velocity.x = -200;

  var pipe2 = that.pipes.create(600, oppHeight, 'top pipe');
  pipe2.body.allowGravity = false;
  pipe2.scale.setTo(.55, .55);
  pipe2.body.velocity.x = -200;
  // that.pipe1.body.immovable = true;
}

Play.prototype.update = function(){

  this.physics.arcade.collide(this.flappy, this.pipes, this.stopFlappy.bind(this), null, this);
  this.checkWorldCol();
  // when space is pressed, start flap animation and add to y velocity
  if(this.keys.jump.isDown){
    this.flappy.animations.play('flap');
    this.flappy.body.velocity.y = -150;
  }
}

Play.prototype.checkWorldCol = function(){
  var flappyTop = this.flappy.body.bottom - this.flappy.body.height;
  if(this.flappy.body.bottom >= this.world.bounds.bottom || flappyTop <= this.world.bounds.top){
    this.stopFlappy();
  }
}

Play.prototype.stopFlappy = function(){
  GAME.game.state.start('game_over');
}

GAME.Play = Play;