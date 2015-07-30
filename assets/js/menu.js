var GAME = GAME || {};

Menu = function(){

};

Menu.prototype.preload = function(){
  this.load.spritesheet('flappy', './assets/images/flappy.png', 92, 66);
  this.load.image('bg-tile', './assets/images/bg.png');
  this.load.image('button', './assets/images/menu.png');
};

Menu.prototype.create = function(){
  this.bgtile = this.add.tileSprite(0, 0, GAME.width, GAME.height, 'bg-tile');

  this.flappy = this.add.sprite(200, 100, 'flappy')
  this.flappy.scale.set(.4, .4);

  this.flappy.animations.add("flap", [2, 1, 0, 1], 10, true)
  this.flappy.animations.play('flap');

  this.button = this.add.button(220, 50, "button", this.startGame, this)

};

Menu.prototype.update = function(){

};

Menu.prototype.startGame = function(){
  this.state.start('Play');
};

GAME.Menu = Menu;