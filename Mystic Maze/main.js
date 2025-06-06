const canvas = document.getElementById("mazeCanvas");
const context = canvas.getContext("2d");
const mazeSize = 10; // Maze dimensions
const cellSize = Math.min(window.innerWidth / (mazeSize + 2), window.innerHeight / (mazeSize + 2)); // Responsive sizing

canvas.width = mazeSize * cellSize;
canvas.height = mazeSize * cellSize;

let maze = generateMaze(mazeSize);
let player = { x: 0, y: 0 }; // Starting position
let goal = { x: mazeSize - 1, y: mazeSize - 1 }; // Goal position
let bubbles = []; // For storing bubble properties when the goal is reached

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("keydown", movePlayer);
canvas.addEventListener("touchstart", handleTouchStart, false);
canvas.addEventListener("touchend", handleTouchEnd, false);

drawMaze();

function drawMaze() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    maze.forEach((row, y) => row.forEach((cell, x) => drawCell(cell, x, y)));
    drawGoal();
    drawPlayer();
    drawBubbles();
}

function drawGoal() {
    context.fillStyle = "rgba(255, 20, 147, 0.8)";  // Deep glowing magenta color for the goal
    context.shadowColor = 'rgba(255, 20, 147, 1)';  // Brighter shadow color for better visibility
    context.shadowBlur = 30;  // Increased blur for more pronounced glow
    context.fillRect(goal.x * cellSize + 10, goal.y * cellSize + 10, cellSize - 20, cellSize - 20);
    context.shadowBlur = 0; // Reset the shadowBlur after drawing
}

function drawPlayer() {
    context.fillStyle = 'rgba(0, 191, 255, 0.8)';  // Deep glowing blue color for the player
    context.shadowColor = 'rgba(0, 191, 255, 1)';  // Brighter shadow color for better visibility
    context.shadowBlur = 30;  // Increased blur for more pronounced glow
    context.fillRect(player.x * cellSize + 10, player.y * cellSize + 10, cellSize - 20, cellSize - 20);
    context.shadowBlur = 0; // Reset the shadowBlur after drawing
}



function drawCell(cell, x, y) {
    const posX = x * cellSize;
    const posY = y * cellSize;
    context.strokeStyle = '#192c4e';
    context.lineWidth = 5;
    if (cell.walls.top) context.strokeRect(posX, posY, cellSize, 0);
    if (cell.walls.right) context.strokeRect(posX + cellSize, posY, 0, cellSize);
    if (cell.walls.bottom) context.strokeRect(posX, posY + cellSize, cellSize, 0);
    if (cell.walls.left) context.strokeRect(posX, posY, 0, cellSize);
}

function generateMaze(size) {
    let stack = [];
    let maze = [];

    for (let y = 0; y < size; y++) {
        maze[y] = [];
        for (let x = 0; x < size; x++) {
            maze[y][x] = { visited: false, walls: { top: true, right: true, bottom: true, left: true } };
        }
    }

    let current = { x: 0, y: 0 };
    maze[current.y][current.x].visited = true;
    stack.push(current);

    while (stack.length > 0) {
        current = stack.pop();
        let neighbors = getUnvisitedNeighbors(current.x, current.y, maze);

        if (neighbors.length > 0) {
            stack.push(current);
            let next = neighbors[Math.floor(Math.random() * neighbors.length)];

            removeWalls(current, next, maze);
            maze[next.y][next.x].visited = true;
            stack.push(next);
        }
    }

    return maze;
}

function getUnvisitedNeighbors(x, y, maze) {
    let neighbors = [];
    if (y > 0 && !maze[y - 1][x].visited) neighbors.push({ x, y: y - 1 });
    if (x < maze.length - 1 && !maze[y][x + 1].visited) neighbors.push({ x: x + 1, y });
    if (y < maze.length - 1 && !maze[y + 1][x].visited) neighbors.push({ x, y: y + 1 });
    if (x > 0 && !maze[y][x - 1].visited) neighbors.push({ x: x - 1, y });

    return neighbors;
}

function removeWalls(current, next, maze) {
    if (current.x < next.x) {
        maze[current.y][current.x].walls.right = false;
        maze[next.y][next.x].walls.left = false;
    } else if (current.x > next.x) {
        maze[current.y][current.x].walls.left = false;
        maze[next.y][next.x].walls.right = false;
    } else if (current.y < next.y) {
        maze[current.y][current.x].walls.bottom = false;
        maze[next.y][next.x].walls.top = false;
    } else if (current.y > next.y) {
        maze[current.y][current.x].walls.top = false;
        maze[next.y][next.x].walls.bottom = false;
    }
}

function movePlayer(event) {
    let moved = false;
    if (event.key === "ArrowUp" && !maze[player.y][player.x].walls.top) {
        player.y--;
        moved = true;
    } else if (event.key === "ArrowDown" && !maze[player.y][player.x].walls.bottom) {
        player.y++;
        moved = true;
    } else if (event.key === "ArrowLeft" && !maze[player.y][player.x].walls.left) {
        player.x--;  // Fix this line: move player.x, not player.y
        moved = true;
    } else if (event.key === "ArrowRight" && !maze[player.y][player.x].walls.right) {
        player.x++;  // Fix this line: move player.x, not player.y
        moved = true;
    }
    if (moved) {
        drawMaze();
        checkForCompletion();
    }
}


function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
}

function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) { // Horizontal swipe
        if (dx > 0) movePlayer({ key: "ArrowRight" });
        else movePlayer({ key: "ArrowLeft" });
    } else { // Vertical swipe
        if (dy > 0) movePlayer({ key: "ArrowDown" });
        else movePlayer({ key: "ArrowUp" });
    }
}

function checkForCompletion() {
    if (player.x === goal.x && player.y === goal.y) {
        createBubbles();
        animateBubbles();
    }
}

// Create bubble effect
function createBubbles() {
    const bubbleCount = 20;
    for (let i = 0; i < bubbleCount; i++) {
        let bubble = {
            x: Math.random() * canvas.width,
            y: canvas.height,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 2 + 1,
            alpha: 1
        };
        bubbles.push(bubble);
    }
}

// Animate bubbles
function animateBubbles() {
    let animation = setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();

        bubbles.forEach(bubble => {
            context.beginPath();
            context.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
            context.fillStyle = `rgba(255, 182, 193, ${bubble.alpha})`; // Soft pink color
            context.fill();

            bubble.y -= bubble.speed;
            bubble.alpha -= 0.01;

            if (bubble.alpha <= 0) {
                clearInterval(animation);
                alert('Congratulations! You reached the goal!');
            }
        });
    }, 30);
}

function drawBubbles() {
    bubbles.forEach(bubble => {
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 182, 193, ${bubble.alpha})`;
        context.fill();
    });
}


// JavaScript to open and close the burger menu
function openMenu() {
    document.getElementById('burgerMenu').style.display = 'block';
}

function closeMenu() {
    document.getElementById('burgerMenu').style.display = 'none';
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('burgerMenu');
    const burgerIcon = document.querySelector('.burger-menu');
    if (!menu.contains(event.target) && event.target !== burgerIcon) {
        closeMenu();
    }
});