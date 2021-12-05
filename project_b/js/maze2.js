let column;
let row;
let w = 50;
let drill = 1;
let maze;
let initial;
let size = 10;
let level = 1;

let currentPosX = 0;
let currentPosY = 0;

let drillsElem = document.getElementById("drills");
let levelsElem = document.getElementById("levels");


 function preload(){
  img1 =loadImage("assets/role4.png");
  img2 =loadImage("assets/end.png");
  img3 =loadImage("assets/grass3.png");
  img4 =loadImage("assets/soil2.png");

}

class MazeBuilder {
    // ref: https://www.the-art-of-web.com/javascript/maze-generator/
    constructor(width, height) {

        this.width = width;
        this.height = height;

        this.cols = 2 * this.width + 1;
        this.rows = 2 * this.height + 1;

        this.maze = this.initArray(0);

        // place initial walls
        this.maze.forEach((row, r) => {
            row.forEach((cell, c) => {
                switch (r) {
                    case 0:
                    case this.rows - 1:
                        this.maze[r][c] = 1;  // wall
                        break;

                    default:
                        if ((r % 2) == 1) {
                            if ((c == 0) || (c == this.cols - 1)) {
                                this.maze[r][c] = 1;
                            }
                        } else if (c % 2 == 0) {
                            this.maze[r][c] = 1;
                        }

                }
            });

            if (r == 0) {
                // place exit in top row
                let doorPos = this.posToSpace(this.rand(1, this.width));
                this.maze[r][doorPos] = 3;  // exit
            }

            if (r == this.rows - 1) {
                // place entrance in bottom row
                let doorPos = this.posToSpace(this.rand(1, this.width));
                this.maze[r][doorPos] = 2;  // entrance
            }

        });

        // start partitioning
        this.partition(1, this.height - 1, 1, this.width - 1);
    }

    initArray(value) {
        return new Array(this.rows).fill().map(() => new Array(this.cols).fill(value));
    }

    rand(min, max) {
        return min + Math.floor(Math.random() * (1 + max - min));
    }

    posToSpace(x) {
        return 2 * (x - 1) + 1;
    }

    posToWall(x) {
        return 2 * x;
    }

    shuffle(array) {
        // sauce: https://stackoverflow.com/a/12646864
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    partition(r1, r2, c1, c2) {
        // create partition walls
        // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

        let horiz, vert, x, y, start, end;

        if ((r2 < r1) || (c2 < c1)) {
            return false;
        }

        if (r1 == r2) {
            horiz = r1;
        } else {
            x = r1 + 1;
            y = r2 - 1;
            start = Math.round(x + (y - x) / 4);
            end = Math.round(x + 3 * (y - x) / 4);
            horiz = this.rand(start, end);
        }

        if (c1 == c2) {
            vert = c1;
        } else {
            x = c1 + 1;
            y = c2 - 1;
            start = Math.round(x + (y - x) / 3);
            end = Math.round(x + 2 * (y - x) / 3);
            vert = this.rand(start, end);
        }

        for (let i = this.posToWall(r1) - 1; i <= this.posToWall(r2) + 1; i++) {
            for (let j = this.posToWall(c1) - 1; j <= this.posToWall(c2) + 1; j++) {
                if ((i === this.posToWall(horiz)) || (j === this.posToWall(vert))) {
                    this.maze[i][j] = 1;
                }
            }
        }

        let gaps = this.shuffle([true, true, true, false]);

        // create gaps in partition walls
        if (gaps[0]) {
            let gapPosition = this.rand(c1, vert);
            this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = 0;
        }

        if (gaps[1]) {
            let gapPosition = this.rand(vert + 1, c2 + 1);
            this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = 0;
        }

        if (gaps[2]) {
            let gapPosition = this.rand(r1, horiz);
            this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = 0;
        }

        if (gaps[3]) {
            let gapPosition = this.rand(horiz + 1, r2 + 1);
            this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = 0;
        }

        // recursively partition newly created chambers

        this.partition(r1, horiz - 1, c1, vert - 1);
        this.partition(horiz + 1, r2, c1, vert - 1);
        this.partition(r1, horiz - 1, vert + 1, c2);
        this.partition(horiz + 1, r2, vert + 1, c2);
    }
}

function setup() {
    createCanvas(600, 600);

    let Maze = new MazeBuilder(size, size);
    maze = Maze.maze;  // 0: road, 1: wall, 2: start, 3: end

    w = width / maze.length;
    row = column = maze.length;

    //console.log(maze)

    for (let x = 0; x < row; x++) {
        for (let y = 0; y < column; y++) {
            let box = new Box(y, x);
            if (maze[x][y] === 1) {
                box.isWall = true;
            }
            box.display();

            if (maze[x][y] === 2) {
                currentPosX = y;
                currentPosY = x;
            } else if (maze[x][y] === 3) {
                fill(0);
                //push()
                rect(y * w, x * w, w, w);
            }
        }
    }

}

function renderMap() {
    w = width / maze.length;
    row = column = maze.length;

    for (let x = 0; x < row; x++) {
        for (let y = 0; y < column; y++) {
            let box = new Box(y, x);
            if (maze[x][y] === 1) {
                box.isWall = true;
            }
            box.display();

            if (maze[x][y] === 3) {
                //fill(0, 255, 0);
                image(img2,y * w, x * w, w*3.5, w*2.9);
                //rect(y * w, x * w, w, w);
            }
        }
    }
}


function draw() {
  drillsElem.innerHTML = drill;
  levelsElem.innerHTML = level;
    background(255);

    renderMap();

    fill(0, 0, 0);
    //push()
    image(img1,currentPosX * w, currentPosY * w, w*3.2, w*3);
    //rect(currentPosX * w, currentPosY * w, w, w);
    //pop()
    // push()
    // textSize(60)
    // text(drill, 100, 100)
    // pop()

    if (maze[currentPosY][currentPosX] === 3){

      drill +=1;
      size +=2;
      level +=1;
      setup();
    }
// drillsElem.innerHTML = drill;
// drillsElem.innerHTML = level;

}


function Box(x, y) {
    this.x = x;
    this.y = y;
    this.isWall = false;

    this.display = function () {
        //if (x == 0) console.log(1)
        let a = this.x * w;
        let b = this.y * w;
        //stroke(0);
       image(img4,a, b, w, w);



        // line(a, b, a + w, b)
        // line(a + w, b, a + w, b + w)
        // line(a, b + w, a + w, b + w)
        // line(a, b, a, b + w)

        if (this.isWall) {
            //fill(100, 100, 100, 100);

image(img3,a, b, w, w);
            //rect(a, b, w, w);
        }

    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        if (currentPosX - 1 >= 0 && maze[currentPosY][currentPosX - 1] !== 1)
            currentPosX--;
    } else if (keyCode === RIGHT_ARROW) {
        if (currentPosX + 1 < width / w && maze[currentPosY][currentPosX + 1] !== 1)
            currentPosX++;
    } else if (keyCode === DOWN_ARROW) {
        if (currentPosY + 1 < height / w && maze[currentPosY + 1][currentPosX] !== 1)
            currentPosY++;
    } else if (keyCode === UP_ARROW) {
        if (currentPosY - 1 >= 0 && maze[currentPosY - 1][currentPosX] !== 1)
            currentPosY--;

    } else if ((key === 'd') && drill > 0 && maze[currentPosY][currentPosX + 1] == 1) {
        maze[currentPosY][currentPosX + 1] = 0
        drill -= 1
    }
else if (key === 'a' && drill > 0 && maze[currentPosY][currentPosX-1] == 1) {
  maze[currentPosY][currentPosX-1] = 0
  drill -= 1
}
else if (key === 'w' && drill > 0 && maze[currentPosY-1][currentPosX] == 1) {
  maze[currentPosY-1][currentPosX] = 0
  drill -= 1
}
else if (key === 's' && drill > 0 && maze[currentPosY+1][currentPosX] == 1) {
  maze[currentPosY+1][currentPosX] =
  drill -= 1
}

// drillsElem.innerHTML = "drill";
    /*if (currentPosX+1 >= width / w ) {
        randomizeMaze(0.55);
        currentPosX = 0;
        drill += 1
    }*/
}
