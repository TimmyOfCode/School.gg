const boxContainer = document.getElementById('boxContainer');
const gameContainer = document.getElementById('gameContainer');
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');

const numberOfBoxes = 10;
let score = 0;
let speed = 2;
let isGameActive = false;

for (let i = 1; i <= numberOfBoxes; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = `box ${i}`;
    if (i === 1) {
        box.addEventListener('click', startGame);
    }
    boxContainer.appendChild(box);
}

function startGame() {
    boxContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameCanvas.width = window.innerWidth - 40;
    gameCanvas.height = window.innerHeight - 100;
    resetGame();
    document.addEventListener('keydown', jump);
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    score = 0;
    speed = 2;
    isGameActive = true;
    cacti = []; // Reset cacti
    frames = 0;
    dino.y = gameCanvas.height - 50; // Reset dino position
}

function jump(event) {
    if (event.code === 'Space' && isGameActive) {
        dino.y -= 100; // Increased jump height
    }
}

let dino = {
    x: 50,
    y: gameCanvas.height - 50,
    width: 30,
    height: 30
};

let cacti = [];
let frames = 0;

function gameLoop() {
    frames++;
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawDino();
    handleCacti();
    updateScore();
    if (checkCollision()) {
        endGame();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

function drawDino() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    dino.y += 2; // Gravity effect
    if (dino.y > gameCanvas.height - dino.height) {
        dino.y = gameCanvas.height - dino.height; // Ground level
    }
}

function handleCacti() {
    if (frames % (100 + Math.floor(Math.random() * 100)) === 0) {
        const cactusX = gameCanvas.width;
        const cactusHeight = 50 + Math.floor(Math.random() * 50); // Random cactus height
        cacti.push({ x: cactusX, y: gameCanvas.height - cactusHeight, width: 20, height: cactusHeight });
    }
    cacti.forEach((cactus, index) => {
        cactus.x -= speed;
        ctx.fillStyle = 'green';
        ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
        if (cactus.x + cactus.width < 0) {
            cacti.splice(index, 1);
            score += 10; // Increase score
            speed += 0.1; // Increase speed
        }
    });
}

function updateScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function checkCollision() {
    return cacti.some(cactus => {
        return (
            dino.x < cactus.x + cactus.width &&
            dino.x + dino.width > cactus.x &&
            dino.y + dino.height > cactus.y
        );
    });
}

function endGame() {
    isGameActive = false;
    alert('Game Over! Your score was ' + score);
    restartBtn.style.display = 'block';
}

restartBtn.addEventListener('click', () => {
    boxContainer.classList.remove('hidden');
    gameContainer.classList.add('hidden');
    restartBtn.style.display = 'none';
});
