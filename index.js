const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5
};

let obstacle = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 50,
    height: 50,
    speed: 3
};

let gameState = 'running'; // 游戏状态：'running' 或 'paused'

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updatePlayerPosition(direction) {
    if (gameState === 'running') {
        if (direction === 'left' && player.x > 0) {
            player.x -= player.speed;
        } else if (direction === 'right' && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
    }
}

function updateObstaclePosition() {
    if (gameState === 'running') {
        obstacle.y += obstacle.speed;
        if (obstacle.y > canvas.height) {
            obstacle.y = -50;
            obstacle.x = Math.random() * (canvas.width - obstacle.width);
        }
    }
}

function checkCollision() {
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y) {
        // 游戏结束，暂停游戏
        gameState = 'paused';
        alert('游戏结束！你撞到了障碍物。');
    }
}

function initControls() {
    document.getElementById('leftButton').addEventListener('click', function() {
        updatePlayerPosition('left');
    });

    document.getElementById('rightButton').addEventListener('click', function() {
        updatePlayerPosition('right');
    });

    document.getElementById('pauseButton').addEventListener('click', function() {
        if (gameState === 'running') {
            gameState = 'paused';
        } else {
            gameState = 'running';
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameState === 'running') {
        drawPlayer();
        drawObstacle();
        updateObstaclePosition();
        checkCollision();
    }
    requestAnimationFrame(draw);
}

initControls();
draw();