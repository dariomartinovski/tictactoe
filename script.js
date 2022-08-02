const game = document.querySelector("#game"),
    result = document.querySelector(".result");
let restartGameBtn = document.createElement("button");
    restartGameBtn.classList.add("restartGame");
    restartGameBtn.textContent = "Restart game";
let turn, currentClass;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

beginGame();

function beginGame(){
    if(Math.random()>0.5)
        turn = true;
    else
        turn = false;
    for(let i=0;i<9;i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");        
        game.appendChild(cell);
    }
    game.parentElement.appendChild(restartGameBtn);
}

const cells = document.querySelectorAll(".cell");

cells.forEach(item => {
    item.addEventListener("click", e => {
        if(!item.classList.contains("x") && !item.classList.contains("circle")){
            if(turn){
                currentClass = "x";
                item.classList.add("x");
                turn=false;
            }
            else{
                currentClass = "circle";
                item.classList.add("circle");
                turn=true;
            }
            if(checkWin(currentClass)){
                endGame();
            }
        }
    })
})

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
        return cells[index].classList.contains(currentClass)
        })
    })}

const endGame = () => {
    cells.forEach(item => {
        item.setAttribute("style","pointer-events:none;");
    })
    result.textContent = currentClass + " wins";
    // setTimeout(() => alert(currentClass + " wins"),0);
}

const restartGame = () => {
    const xClass = document.querySelectorAll(".x");
    const circleClass = document.querySelectorAll(".circle");
    xClass.forEach(item => item.classList.remove("x"));
    circleClass.forEach(item => item.classList.remove("circle"));
    result.textContent = "";
}

restartGameBtn.addEventListener("click", e=>{
    cells.forEach(item => {
        restartGame();
        item.setAttribute("style","pointer-events:all;");
    })
})