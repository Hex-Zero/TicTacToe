import * as React from 'react'

type PlayerId = 0 | 1
type Cell = PlayerId | null
type Board = Array<Array<Cell>>
type Result =
	| {
			type: 'DRAW'
		}
	| {
			type: 'WINNER'
			winnerId: PlayerId
		}
type State =
	| {
			type: 'NOT_STARTED'
		}
	| {
			type: 'STARTED'
			currentPlayerId: PlayerId
			board: Board
		}
	| {
			type: 'COMPLETED'
			result: Result
			board: Board
		}

export default class GameController extends React.PureComponent<{}, State> {
	state: State = { type: 'NOT_STARTED' }

	render(): React.ReactNode {
		let buttonLable = null,
			gameBoard = null,
			currentPlayerInfo = null,
			gameResultInfo = null

		switch (this.state.type) {
			case 'NOT_STARTED':
				buttonLable = 'Start new game'
				gameBoard = this._renderBoard(null)
				break
			case 'STARTED':
				buttonLable = 'Restart Game'
				gameBoard = this._renderBoard(this.state.board)
				currentPlayerInfo: this._getPlayerName(this.state.currentPlayerId)
				break
			case 'COMPLETED':
				buttonLable = 'Restart Game'
				gameBoard = this._renderBoard(this.state.board)
				gameResultInfo = this._getGameResult(this.state.result)
				break
		}
		return (
			<div className='game-window'>
				<h1>Tic Tac Toe</h1>
				<button onClick={this._resetGame}>{buttonLable}</button>
				<div>{gameBoard}</div>
				{currentPlayerInfo != null && <h2>{currentPlayerInfo}</h2>}
				{gameResultInfo != null && <h2>{gameResultInfo}</h2>}
			</div>
		)
	}
	_renderBoard(nullableBoard: Board | null): React.ReactNode {
		const board = nullableBoard == null ? this._getEmptyBoard() : nullableBoard
		const content = board.map((row, rowIndex) => {
			return (
				<div className='Row'>
					{row.map((col, colIndex) => (
						<div
							className='Cell'
							onClick={this._onClickCell.bind(this, board, rowIndex, colIndex)}>
							{col == null ? '' : this._getPlayerName(col)}
						</div>
					))}
				</div>
			)
		})
		return <div className='Board'>{content}</div>
	}

	_resetGame = (): void => {
		this.setState({
			type: 'STARTED',
			currentPlayerId: Math.random() >= 0.5 ? 0 : 1,
			board: this._getEmptyBoard()
		})
	}
	_onClickCell(board: Board, rowIndex: number, colIndex: number): void {
		if (this.state.type !== 'STARTED' || board[rowIndex][colIndex] != null) {
			return
		}
		board[rowIndex][colIndex] = this.state.currentPlayerId
		const result = this._tryCompleteGame()
		if (result == null) {
			this.setState({
				type: 'STARTED',
				currentPlayerId: this.state.currentPlayerId === 0 ? 1 : 0,
				board
			})
		} else {
			this.setState({
				type: 'COMPLETED',
				result,
				board
			})
		}
	}
	_tryCompleteGame(): Result | null {
		if (this.state.type !== 'STARTED') {
			return null
		}
		const board = this.state.board
		for (let row = 0; row < board.length; row++) {
			let hasWonForTheRow = true
			for (let col = 0; col < board[row].length; col++) {
				if (board[row][0] == null || board[row][col] !== board[row][0]) {
					hasWonForTheRow = false
					break
				}
			}
			if (hasWonForTheRow) {
				return { type: 'WINNER', winnerId: this.state.currentPlayerId }
			}
		}
		for (let col = 0; col < board[0].length; col++) {
			let hasWonForTheCol = true
			for (let row = 0; row < board.length; row++) {
				if (board[0][col] == null || board[row][col] !== board[0][col]) {
					hasWonForTheCol = false
					break
				}
			}
			if (hasWonForTheCol) {
				return { type: 'WINNER', winnerId: this.state.currentPlayerId }
			}
		}
		if (board[0][0] != null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
			return { type: 'WINNER', winnerId: this.state.currentPlayerId }
		}
		if (board[0][2] != null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
			return { type: 'WINNER', winnerId: this.state.currentPlayerId }
		}
		let hasDrawn = true
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board[row].length; col++) {
				if (board[row][col] == null) {
					hasDrawn = false
					break
				}
			}
			if (!hasDrawn) {
				break
			}
		}
		if (hasDrawn) {
			return { type: 'DRAW' }
		}
		return null
	}
	_getEmptyBoard(): Board {
		return [ [ null, null, null ], [ null, null, null ], [ null, null, null ] ]
	}

	_getPlayerName(playerId: PlayerId): string {
		return playerId === 0 ? 'O' : 'X'
	}
	_getGameResult(result: Result): string {
		if (result.type === 'DRAW') {
			return 'Game is a Draw'
		} else {
			return 'Player ' + this._getPlayerName(result.winnerId) + ' has won!'
		}
	}
}
