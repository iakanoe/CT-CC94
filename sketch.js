let grid;
let grid_new;
let score = 0;

function setup() {
    createCanvas(400, 400);
    noLoop();
    grid = blankGrid();
    grid_new = blankGrid();
    addNumber();
    addNumber();
    updateCanvas();
}

// One "move"
function keyPressed() {
    let flipped = false;
    let rotated = false;
    switch (keyCode) {
        case DOWN_ARROW:
            // do nothing
            break;
        case UP_ARROW:
            grid = flipGrid(grid);
            flipped = true;
            break;
        case RIGHT_ARROW:
            grid = transposeGrid(grid, 1);
            rotated = true;
            break;
        case LEFT_ARROW:
            grid = transposeGrid(grid, 1);
            grid = flipGrid(grid);
            rotated = true;
            flipped = true;
            break;
        default:
            return;
    }

    let past = copyGrid(grid);
    grid = grid.map(operate);

    let changed = compare(past, grid);
    if (flipped) {
        grid = flipGrid(grid);
    }
    if (rotated) {
        grid = transposeGrid(grid, -1);
    }
    if (changed) {
        addNumber();
    }
    updateCanvas();

    if (isGameOver()) {
        console.log("GAME OVER");
    }

    if (isGameWon()) {
        console.log("GAME WON");
    }
}

function updateCanvas() {
    background(255);
    drawGrid();
    select('#score').html(score);
}

function drawGrid() {
    const w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(2);
            let val = grid[i][j];
            let s = val.toString();
            if (grid_new[i][j] === 1) {
                stroke(200, 0, 200);
                strokeWeight(16);
                grid_new[i][j] = 0;
            } else {
                strokeWeight(4);
                stroke(0);
            }

            if (val != 0) {
                fill(colorsSizes[s].color);
            } else {
                noFill();
            }
            rect(i * w, j * w, w, w, 30);
            if (val !== 0) {
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(colorsSizes[s].size);
                text(val, i * w + w / 2, j * w + w / 2);
            }
        }
    }
}