let gameSeq = [];
let userSeq = [];
let gameBtns = [];

let color = ["red","yellow","green","purple"];
let h2 = document.querySelector("h2");

let started = false;
let level = 0;
let currScores = [];
document.addEventListener("keypress",function() {
    if(started == false){
        console.log("Game started!");
        started = true;
        levelup();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


function levelup(){
    userSeq = [];
    level++;
    currScores.push(level-1);
    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = color[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameBtns.push(randBtn);
    gameSeq.push(randColor);
    // console.log(gameSeq);
    // console.log(currScores);
    
    for(let i = 0; i<gameBtns.length; i++){
        setTimeout(function (){
            gameFlash(gameBtns[i]);
        },i*600);
    }
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function btnCheck(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length === userSeq.length){
            setTimeout(levelup,1000);
        }
    } else{
        let score = level-1;
        if(score < 0){
            score = 0;
        }
        let bestScore = highestScore();
        h2.innerHTML = `Game over! <br> Highest Score = </b>${bestScore}</b> &nbsp&nbsp&nbsp&nbsp Current Score = <b>${score}</b> <br>press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset();
    }
}

function highestScore(){
    let bestScore = 0;
    for(currScore of currScores){
        if(currScore>bestScore){
            bestScore = currScore;
        }
    }
    return bestScore;
}

function btnPress(){

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    btnCheck(userSeq.length-1);
    
}

let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click",btnPress)
}

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    gameBtns = [];
    level = 0;
}