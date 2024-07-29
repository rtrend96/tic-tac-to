import { useState } from "react";
import "./App.css";

const Square = ({ value, onSquareClick }) => (
	<button className="square" onClick={onSquareClick}>
		{value}
	</button>
);

const Board = ({ xIsNext, squares, onPlay }) => {
	const handleClick = (i) => {
		if (calculateWinner(squares) || squares[i]) return;
		const nextSquares = [...squares];
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares);
	};

	const winner = calculateWinner(squares);
	const status = winner
		? `Winner: ${winner}`
		: `Next player: ${xIsNext ? "X" : "O"}`;

	return (
		<>
			<div className="status">{status}</div>
			<div className="board-row">
				{squares.slice(0, 3).map((value, i) => (
					<Square key={i} value={value} onSquareClick={() => handleClick(i)} />
				))}
			</div>
			<div className="board-row">
				{squares.slice(3, 6).map((value, i) => (
					<Square
						key={i + 3}
						value={value}
						onSquareClick={() => handleClick(i + 3)}
					/>
				))}
			</div>
			<div className="board-row">
				{squares.slice(6, 9).map((value, i) => (
					<Square
						key={i + 6}
						value={value}
						onSquareClick={() => handleClick(i + 6)}
					/>
				))}
			</div>
		</>
	);
};

const App = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	const handlePlay = (nextSquares) => {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	};
	const handleNewGame = () => {
		setHistory([Array(9).fill(null)]);
		setCurrentMove(0);
	};
	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<button className="new-game-button" onClick={handleNewGame}>
				New Game
			</button>
		</div>
	);
};

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (const [a, b, c] of lines) {
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};

export default App;
