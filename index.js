
let = buttonColours = ['red', 'blue', 'green', 'yellow'];
let level = 0;
let gamePattern = [];
let userClickedPattern = [];
let buttons = document.querySelectorAll('.btn');




function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    document.querySelector('h1').textContent = `Nível ${level}`
    gamePattern.push(randomChosenColour);
    
    userClickedPattern = [];
    playSound(randomChosenColour);
    level++
    document.querySelector('h1').textContent = `Nível ${level}`
}
function playSound(id) {
    let audio = new Audio(`sounds/${id}.mp3`);
    audio.play();
    document.querySelector('#' + id).classList.add('pressed');
    setTimeout(() => {document.querySelector('#' + id).classList.toggle('pressed');}, 200);
}
function checkAnswear(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log('Correct')
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(() => {nextSequence()}, 800);
        }
    } else {
        resetGame();
    }
}

function resetGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    document.body.classList.add('game-over')
    
    setTimeout(() => {
        document.body.classList.toggle('game-over');
        document.querySelector('h1').textContent = `Aperte qualquer tecla para começar`;
    }, 500);
    let audio = new Audio('sounds/wrong.mp3');
    audio.play();
}

buttons.forEach((element) => {
    element.addEventListener('click', (e) => {
        let userChosenColour = e.target.getAttribute('id');
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        checkAnswear(userClickedPattern.length - 1);
        console.log(userClickedPattern);
    })
})

document.addEventListener('keydown', ()=> {
    if (level <= 0) {
        nextSequence();
    }
})