const Discord = require('discord.js');
const client = new Discord.Client({ intents: [ 1, 512, 4096, 32768 ] });
const { Snake, Flood } = require('../index');
require('dotenv').config();

client.on('messageCreate', async (message) => {
  if(message.content === '!snake') {
    const Game = new Snake({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Snake Game',
        overTitle: 'Game Over',
        color: '#5865F2'
      },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️', 
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      stopButton: 'Stop',
      timeoutTime: 60000,
      snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
      foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
    
    Game.startGame();
    Game.on('gameOver', result => {
      console.log(result);
    });
  }

  if(message.content === '!flood') {
    const Game = new Flood({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Flood',
        color: '#5865F2',
      },
      difficulty: 18,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
      winMessage: 'You won! You took **{turns}** turns.',
      loseMessage: 'You lost! You took **{turns}** turns.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
    
    Game.startGame();
    Game.on('gameOver', result => {
      console.log(result);  // =>  { result... }
    });
  }
});

client.login(process.env.TOKEN);