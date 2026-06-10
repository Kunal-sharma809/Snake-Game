let foodSound = new Audio('./music/food.mp3');
let gameOverSound = new Audio('./music/gameover.mp3');
let moveSound = new Audio('./music/move.mp3');
let gameSound = new Audio('./music/music.mp3');
let board = document.querySelector("#board");
let scoreBox = document.querySelector("#scoreBox");
let hiScoreBox = document.querySelector("#hiscoreBox");
let snakeDir = {x: 0, y: 0};

let snakeArr = [{x: 4, y: 9}];
let food = {x: 14, y: 9};
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let highScoreVal = 0;


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

const isCollide = (snake) => {

    // Collision with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // Collision with walls
    if(snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake.y >= 18) {
        return true;
    }

    return false;
}


const gameEngine = () => {

    // If collision occurs
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        gameSound.pause();
        snakeDir = {x: 0, y: 0};
        alert("Game Over! Press any key to play again.");
        snakeArr = [{x: 4, y: 9}];
        // gameSound.play();
        score = 0;
    }


    // Part 1: Update snake array and food

    // Move snake
    for(let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    // change direction of snake's head
    snakeArr[0].x += snakeDir.x;
    snakeArr[0].y += snakeDir.y;



    // Snake eats food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + snakeDir.x, y: snakeArr[0].y + snakeDir.y});
        score++;
        scoreBox.innerHTML = `Score : ${score}`;
        if(score > highScoreVal) {
            hiScoreVal = score;
            hiScoreBox.innerHTML = `HiScore: ${highScoreVal}`;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
        }
        let a = 2;
        let b = 16;
        food = {x: Math.floor(a + (b-a) * Math.random()), y: Math.floor(a + (b-a) *Math.random())};
    }



    // Part 2: Display snake and food
    // Display snake
    board.innerHTML = "";
    snakeArr.forEach((elem, idx) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = elem.y;
        snakeElement.style.gridColumnStart = elem.x;
        if(idx === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    //Display food
    foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);
}


// Main logic 
// gameSound.play();

let hiScore = localStorage.getItem("hiScore");
if(hiScore === null) {
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
} else {
    hiScoreVal = JSON.parse(hiScore);
    hiScoreBox.innerHTML = `HiScore: ${hiScoreVal}`;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    moveSound.play();

    switch(e.key) {
        case "ArrowUp":
            snakeDir.x = 0;
            snakeDir.y = -1;
            console.log("ArrowUp");
            break;
        case "ArrowDown":
            snakeDir.x = 0;
            snakeDir.y = 1;
            console.log("ArrowDown");
            break;
        case "ArrowRight":
            snakeDir.x = 1;
            snakeDir.y = 0;
            console.log("ArrowRight");
            break;
        case "ArrowLeft":
            snakeDir.x = -1;
            snakeDir.y = 0;
            console.log("ArrowRight");
            break;
        default :
            break;
    }
})