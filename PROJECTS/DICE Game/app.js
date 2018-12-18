/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, prevRoll, total;

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying=true;
    prevRoll=0;
    total = document.getElementById('total').value;

// We use #something when its an CSS id
// We use .something when its an CSS class

//document.querySelector('#current-'+activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+ dice+ '</em>'

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// We use #something when its an CSS id
// We use .something when its an CSS class

//document.querySelector('#current-'+activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+ dice+ '</em>'

/*
function btn(){
    // Do something here
}

document.querySelector('.btn-roll').addEventListener('click', btn);
*/

document.querySelector('#game').style.display='none'
document.querySelector('.btn-submit').addEventListener('click', function(){
    var total = document.getElementById('total').value;
    if(total != '' && total.match(/^[0-9]+$/) != null){
        init();
        document.querySelector('#game').style.display='block'
    }
});


document.querySelector('.btn-roll').addEventListener('click', function(){
    // 1. Random number
    // 2. Display result
    // 3. Update round score if the rolled number was not a 1
    if(gamePlaying){
        var dice = Math.floor(Math.random()*6)+1;
        //var dice =6;
        //document.querySelector('.dice').style.display = 'block';
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';
        if(dice == 6 && prevRoll == 6){
            scores[activePlayer]=0; 
            document.getElementById('score-'+activePlayer).textContent = '0'
                document.getElementById('current-'+activePlayer).textContent = '0'
            nextPlayer()
            prevRoll=0;
            console.log('aman')
        }
        else if(dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent=roundScore;
            prevRoll=dice;
        }else{
            //Next player
                nextPlayer();
                prevRoll=0;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    // Add CURRENT score to GLOBAL score
    // Update the UI
    // Check if player won the game
    prevRoll=0
    scores[activePlayer] += roundScore;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer]>=total){
        document.querySelector('#name-'+activePlayer).textContent = 'WINNER !';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying=false;
    }
    else
        nextPlayer();
});

document.querySelector('.btn-new').addEventListener('click', function(){
    document.querySelector('#game').style.display='none'
    //init();
});

function nextPlayer(){
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.getElementById('current-0').textContent = '0'
        document.getElementById('current-1').textContent = '0'
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none'
}
