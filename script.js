var board;
var score = 0;
var rows = 4; //baris (horizontal)
var columns = 4; // kolom (vertikal)
var storageArray = [];

window.onload = function () {
    setGame();
}
function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // board = [
    //     [2,4,8,16],
    //     [32,64,128,256],
    //     [512,1024,2048,4096],
    //     [8192,0,0,0]
    // ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);

        }
    }
    setTwo();
    setTwo();
}
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;

    }

    let found = false;
    while (!found) {
        //random r, c
        let r = Math.floor(Math.random() * rows); //0-1 * 4->0 , 0, 3
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;

        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // clear the classlist
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}


document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideleft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideright();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    localStorage.setItem("nilai", score);
    highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
    localStorage.setItem("highScore", highScore)

    

    // document.getElementById('current-score').innerText = currentScore;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('highscore').innerText = highScore;
        console.log(highScore);
    }

})

function filterZero(row) {
    return row.filter(num => num != 0); //buat array baru tanpa Nol
}


function slide(row) {
    //[0, 2, 2, 2]
    row = filterZero(row); // singkirkan Nol -> [2, 2, 2]

    //slide
    for (let i = 0; i < row.length - 1; i++) {
        //check every 2
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row); // [4, 2]


    //add Length
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}



function slideleft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c];
            updateTile(tile, num);
        }
    }

}

function slideright() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c];
            updateTile(tile, num);
        }
    }

}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c],];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c];
            updateTile(tile, num);
        }

    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c],];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c];
            updateTile(tile, num);
        }

    }
}
function printHighscores() {

    var userInitials = JSON.parse(localStorage.getItem("userInitials"));
    var highScore = JSON.parse(localStorage.getItem('userScore'));
    storageArray.push(userInitials, highScore);
    console.log(storageArray)
} 