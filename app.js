/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


//Variables
let scores, roundScore, activePlayer, scoreLimit, lastDieOne, lastDieTwo, dice, dice2

//States
let gamePlaying, twoDice
let initFunction = function(){
    scores = [0,0]
    roundScore = 0;
    activePlayer = 0; //0 = firstPlayer 1 = secondPlayer
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none' //Sets the Dice's Display to none to hide the element at the start of the game.

    document.querySelector('.dice2').style.display = 'none' 

    document.getElementById('score-0').textContent = scores[0]
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = "Player 1"
    document.getElementById('name-1').textContent = "Player 2"
    document.querySelector('.player-0-panel').classList.remove('winner')    //Removes the winner class from both to make sure that no one has the winner sta
    document.querySelector('.player-1-panel').classList.remove('winner')

    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')   //This removed the active class to make sure we dont add a 2nd and keep haviong active classes stack. This gurentees that there will only be 1
    


}
initFunction()

document.querySelector('.btn-new').style.display = 'none'
document.querySelector('.btn-info').style.display = 'none'
document.querySelector('.btn-info').style.opacity = '0';
document.querySelector('.btn-new').style.opacity = '0';





document.querySelector('.info-wrapper').style.zIndex = "-1"
//Just for learning porposes not for the actual game.
// document.getElementById('#current-' + activePlayer).textContent = dice

//GAME MECHANICS FUNCTIONALITY TO ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        if(twoDice) {
        // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        
        let diceDOM1 = document.querySelector('.dice');
        let diceDOM2 = document.querySelector('.dice2')
        diceDOM1.style.display = "block"
        diceDOM2.style.display = "block"
        
        

        // diceDOM.style.display = 'block';
        diceDOM1.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';
            //If dice 1 or dice 2 dont land on a 1 or a 6 then add the score 
            if(dice !== 1 && dice !== 6 && dice2 !== 1 && dice2 !== 6){
                roundScore += dice + dice2
                lastDieOne = dice
                lastDieTwo = dice2
                document.querySelector('#current-' + activePlayer).textContent = roundScore
            }
            else{
                //Next Player
                nextPlayer()
            }

            if(lastDieOne === 6 || dice === 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            }
    
            if(lastDieOne === 1 || dice === 1){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            }


        }
        //1 dice
        else{
                    // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        
        diceDOM1 = document.querySelector('.dice');
        diceDOM1.style.display = "block"
        
        

        // diceDOM.style.display = 'block';
        diceDOM1.src = 'dice-' + dice + '.png';
            if (dice !== 1 && dice !== 6 ) {
                //Add score
                roundScore += dice
                lastDieOne = dice
                document.querySelector('#current-' + activePlayer).textContent = roundScore
            } else {
                //Next player
                nextPlayer()
            }
    
            if(lastDieOne === 6 || dice === 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            }
    
            if(lastDieOne === 1 || dice === 1){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            }
        }

 }    
});
//BTN HOLD FUNCTIONALITY
document.querySelector(".btn-hold").addEventListener('click', function(){
    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore

        //Update UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        
        // Check if player won the game
        if(scores[activePlayer] >= scoreLimit){
            document.querySelector('#name-' + activePlayer).textContent = "Winner!"
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.dice2').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false;
        } else{
        //Next Player
        nextPlayer();
        }
    }


})
//HEXT PLAYER FUNCTIONALITY
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 // Next Player 
    roundScore = 0;
    lastDieOne = 0;
    dice = 0;
    dice2 = 0;


    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    //Reference  
    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')

    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.dice2').style.display = 'none'
    
}





//Info button 
document.querySelector('.btn-info').addEventListener('click', function() {
    document.querySelector('.btn-info').style.opacity = '0'
    document.querySelector('.btn-info').style.cursor = 'initial'
    document.querySelector('.btn-new').style.opacity = '0'
    document.querySelector('.btn-new').style.cursor = 'initial'
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
    document.querySelector('.info-wrapper').style.opacity = "1"
    document.querySelector('.btn-new').style.display = 'none'
    document.querySelector('.info-wrapper').style.zIndex = "100"
    
})


//Info button close
document.querySelector('.btn-exit').addEventListener('click', function(){
    document.querySelector('.btn-info').style.opacity = '1'
    document.querySelector('.btn-info').style.cursor = 'pointer'
    document.querySelector('.btn-new').style.display = 'block'
    document.querySelector('.btn-new').style.opacity = '1'
    
    document.querySelector('.btn-new').style.cursor = 'pointer'
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
    document.querySelector('.info-wrapper').style.opacity = "0"
    document.querySelector('.info-wrapper').style.zIndex = "-1"

})


//NEW GAME BUTTON TO OPEN NEW GAME FORM
document.querySelector('.btn-new').addEventListener('click', function(){
    document.querySelector('.newGame').style.display = 'block';
    document.querySelector('.newGame').style.opacity = '1';
    document.querySelector('.btn-new').style.display = 'none'
    document.querySelector('.btn-info').style.display = 'none'
})


//New Game Form

document.querySelector('.newGameSubmit').addEventListener('click', function(){
    document.querySelector('.btn-new').style.display = 'block'
    document.querySelector('.btn-new').style.opacity = '1';
    document.querySelector('.btn-info').style.opacity = '1';
    document.querySelector('.btn-info').style.display = 'block'

    let diceCheck = document.getElementById('1dice').checked;
    scoreLimit = document.getElementById('scoreLimit').value;
    console.log(scoreLimit)
    if (diceCheck){
        twoDice = false;
    } else{
        twoDice = true;
    }
    console.log(twoDice)
    document.querySelector('.newGame').style.display = 'none'
    document.querySelector('.newGame').style.opacity = '0'
    if(scoreLimit = 100 || scoreLimit == 1){
        console.log(scoreLimit)
        initFunction()

    } else{
        console.log('this called?')
        document.querySelector('.error').textContent = 'error'
    }
    
})
