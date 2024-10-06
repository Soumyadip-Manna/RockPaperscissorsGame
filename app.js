const score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    loses : 0,
    ties : 0
};

console.log(score);

updateScoreElement();

let isAutoPlaying = false;
let intervalId; 

function autoPlay(){
    if(!isAutoPlaying){
        
        intervalId = setInterval(function(){
            const playerMove  = pickComputerMove();
            playGame(playerMove);
        },1000);

        isAutoPlaying = true;
    }
    else {
        
        clearInterval(intervalId);
        isAutoPlaying = false;
        
    }
    
}

function playGame(guess){
    const computerMove = pickComputerMove();
    let result = '';

    if(guess === 'rock'){

        if(computerMove === 'rock'){
            result = 'Tie.';
        }
        else if(computerMove === 'paper'){
            result = 'You lose.';
        }
        else if(computerMove === 'scissors'){
            result = 'You win.';
        }
    }

    else if(guess === 'paper'){
        if(computerMove === 'rock'){
            result = 'You win.';
        }
        else if(computerMove === 'paper'){
            result = 'Tie.';
        }
        else if(computerMove === 'scissors'){
            result = 'You lose.';
        }
    }

    else if(guess === 'scissors'){
        if(computerMove === 'rock'){
            result = 'You lose.';
        }
        else if(computerMove === 'paper'){
            result = 'You win.';
        }
        else if(computerMove === 'scissors'){
            result = 'Tie.';
        }
    }

// storing score 
        if(result === 'You win.'){
            score.wins +=1;
        }
        else if(result === 'You lose.'){
            score.loses += 1;
        }
        else if(result === 'Tie.'){
            score.ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));   
        updateScoreElement();
        document.querySelector('.js-result')
        .innerHTML = `${result}`;
        
        
        document.querySelector('.js-moves')
            .innerHTML = `
            You <img src="./images/${guess}-emoji.png" alt="" class="move-icon"> 
            <img src="./images/${computerMove}-emoji.png" alt="" class="move-icon"> Computer 
            `;
        
        
}

function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML = `Wins : ${score.wins} Loses : ${score.loses} Ties : ${score.ties} `;
}



function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';
    if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
    }
    else if(randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'scissors';
    }
    console.log(computerMove);

    return computerMove;
}