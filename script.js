const CONTAINER_DIV = document.querySelector(".container");
const BUTTON = document.querySelector("button");
let GRID_RESETS = 0;

CONTAINER_DIV.addEventListener("mouseover", (event) => {
    if(event.target.classList.contains("square")) {
        event.target.style.filter = "brightness(" + (2 - getMinusBrightness()) + ")";
    }
})

BUTTON.addEventListener("click", () => {
    let validGrid = false;
    let width = 16;
    let height = 16;
    while(!validGrid) {
        width = parseInt(prompt("Ingresar el ancho de la grilla (MAX 100): "));
        height = parseInt(prompt("Ingresar la altura de la grilla (MAX 100): "));

        validGrid = isGridValid(width, height);
    }

    updateGridResets();
    createNewGrid(width, height);
})

function isGridValid(width, height) {
    return width <= 100 && width >= 1 && height <= 100 && height >= 1;
}

function updateGridResets() {
    if(GRID_RESETS < 10) {
        GRID_RESETS++;
    }
}

function emptySquareArray() {
    const squareNodes = document.querySelectorAll(".square");

    squareNodes.forEach(squareNode => {
        CONTAINER_DIV.removeChild(squareNode);
    })
}

function getSquareTotal(width, height) {
    return width * height;
}

function createSquareArray(width, height) {
    const squareArray = [];
    const squareTotal = getSquareTotal(width, height);
    for(let i = 0; i < squareTotal; i++) {
        squareArray.push(document.createElement("div"));
    }
    return squareArray;
}

function getSquareBasis(width) {
    return (100 / width) + "%";
}

function setSquaresBasis(width, squareArray) {
    const squareBasis = getSquareBasis(width);
    squareArray.forEach(squareNode => {
        squareNode.style.flex = "0 0 " + squareBasis;
    })
}

function getSquareHeight(height) {
    return (100 / height) + "%";
}

function setSquaresHeight(height, squareArray) {
    const squareHeight = getSquareHeight(height);
    squareArray.forEach(squareNode => {
        squareNode.style.height = squareHeight;
    })
}

function setRandomSquaresColor(squareArray) {
    squareArray.forEach(squareNode => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        squareNode.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    })
}

function getMinusBrightness() {
    return GRID_RESETS / 10;
}

function getSquareBaseBrightness() {
    return 1 - getMinusBrightness();
}

function setSquaresBaseBrightness(squareArray) {
    const baseSquareBrightness = getSquareBaseBrightness();
    squareArray.forEach(squareNode => {
        squareNode.style.filter = "brightness(" + baseSquareBrightness + ")"
    })
}

function setSquaresClass(squareArray) {
    squareArray.forEach(squareNode => {
        squareNode.classList.add("square");
    })
}

function setSquaresSettings(width, height, squareArray) {
    setSquaresBasis(width, squareArray);
    setSquaresHeight(height, squareArray);
    setRandomSquaresColor(squareArray);
    setSquaresBaseBrightness(squareArray);
    setSquaresClass(squareArray);
}

function appendSquares(squareArray) {
    squareArray.forEach(squareNode => {
        CONTAINER_DIV.appendChild(squareNode);
    })
}

function createNewGrid(width, height) {
    emptySquareArray();
    const squareArray = createSquareArray(width, height);
    setSquaresSettings(width, height, squareArray);
    appendSquares(squareArray);
}

createNewGrid(16, 16);