/*
	TODO
	- Score system
	- Smoother gameplay
	- Random Apple generation
	- MORE STUFF!
*/

class Game {
	constructor(board, snake) {
		this.board = board
		this.snake = snake
		this.fruit = new Fruit()
		this.collisionManager = new CollisionManager()
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

	render() {
		this.board.drawFruit(this.fruit)
		this.board.drawSnake(this.snake)
	}

	init() {
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		setInterval(() => {this.gameLoop()}, 150);
	}

	gameLoop() {
		this.board.clearCanvas()
		this.snake.move()
		if (this.collisionManager.checkWallCollision(this.snake, this.board) || this.collisionManager.checkSelfCollision(this.snake)) {
			alert("Game Over!")
			this.snake = new Snake
		}
		if (this.collisionManager.checkFruitCollision(this.snake, this.fruit)) {
			this.snake.grow()
		}
		this.render()
	}
}

class CanvasManager {
	constructor(canvasElement) {
		this.canvas = canvasElement
		this.context = this.canvas.getContext('2d')
	}

	clearCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
	checkWallCollision(snake, board) {
		const head = snake.body[0]
		if (head.x < 0 || head.x >= board.canvas.width || head.y < 0 || head.y >= board.canvas.height)
			{
				return true
			}
		return false
	}

	checkFruitCollision(snake, fruit) {
		const head = snake.body[0]
		if (head.x === fruit.x && head.y === fruit.y) {
			return true
		}
		return false
	}

	checkSelfCollision(snake) {
		const head = snake.body[0]
		for (let i = 1; i < snake.body.length; i++) {
			if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
				return true
			}
		}
		return false
	}
}

class Snake {
	constructor() {
		this.body = [{ x: 40, y: 40 }];
		this.direction = 'right';
	}

	changeDirection(newDirection) {
		if (this.body.length === 1 || this.isValidDirection(newDirection)) {
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

	grow() {
		let {x, y} = this.body[0]
		switch (this.direction) {
			case 'up':
				y = 40
				break;
			case 'down':
				y = -40
				break;
			case 'right':
				x = -40
				break;
			case 'left':
				x = 40
				break;
		}
		const tail = {x: x, y: y}
		this.body.push(tail);
	}
}

class Fruit {
	constructor() {
		this.x = 80
		this.y = 80
	}
}

window.onload = function () {
	const snake = new Snake()
	const canvasElement = document.getElementById("snakeCanvas")
	const canvasManager = new CanvasManager(canvasElement)
	const game = new Game(canvasManager, snake)
	game.init()
}