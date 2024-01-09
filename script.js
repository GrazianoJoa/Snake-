class Game {
	constructor(board, snake) {
		this.board = board
		this.snake = snake
	}

	handleKeyDown(event) {
		switch (event.key) {
			case 'ArrowUp':
				this.snake.changeDirection('up');
				break;
			case 'ArrowDown':
				this.snake.changeDirection('down');
				break;
			case 'ArrowRight':
				this.snake.changeDirection('right');
				break;
			case 'ArrowLeft':
				this.snake.changeDirection('left');
		}
	}

	init() {
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		setInterval(() => {this.gameLoop()}, 200);
	}

	gameLoop() {
		this.board.clearCanvas()
		this.snake.move()
		this.board.drawSnake(this.snake)
	}
}

class CanvasManager {
	constructor(canvasElement) {
		this.canvas = canvasElement
		this.context = this.canvas.getContext('2d')
	}

	clearCanvas() {
		console.log(this.canvas.width)
		this.context.clearRect(0, 0, 400, 400)
	}

	drawRect(x, y, width, heigth, color) {
		this.context.fillStyle = color
		this.context.fillRect(x, y, width, heigth)
	}

	drawSnake(snake) {
		for (let i = 0; i < snake.body.length; i++) {
			this.drawRect(snake.body[i].x, snake.body[i].y, 40, 40, "green");
		}
	}

	drawFruit(fruit) {
		this.drawRect(fruit.x, fruit.y, 40, 40, "red");
	}
}

class CollisionManager {

}

class Snake {
	constructor() {
		this.body = [{ x: 40, y: 40 }];
		this.direction = 'right';
	}

	changeDirection(newDirection) {
		if (this.isValidDirection(newDirection)) {
			this.direction = newDirection;
		}
	}

	isValidDirection(newDirection) {
		if (
			(this.direction === 'up' && newDirection === 'down') ||
			(this.direction === 'down' && newDirection === 'up') ||
			(this.direction === 'left' && newDirection === 'right') ||
			(this.direction === 'right' && newDirection === 'left')
		) {
			return false
		}
		return true;
	}

	move() {
		const newHead = {x: this.body[0].x, y: this.body[0].y}
		switch (this.direction) {
			case 'up':
				newHead.y -= 40
				break;
			case 'down':
				newHead.y += 40
				break;
			case 'right':
				newHead.x += 40
				break;
			case 'left':
				newHead.x -= 40
				break;
		}

		this.body.unshift(newHead)
		this.body.pop()
	}
}

window.onload = function () {
	const snake = new Snake()
	const canvasElement = document.getElementById("snakeCanvas")
	const canvasManager = new CanvasManager(canvasElement)
	const game = new Game(canvasManager, snake)
	game.init()
}