var GAME = GAME || {};

GAME.width = 600;
GAME.height = 300;
GAME.parent = document.querySelector('#game');

GAME.game = new Phaser.Game(GAME.width, GAME.height, Phaser.CANVAS, GAME.parent)

GAME.game.state.add('Play', GAME.Play);
GAME.game.state.add('Menu', GAME.Menu);
GAME.game.state.add('game_over', GAME.GameOver);

GAME.game.state.start('Menu');