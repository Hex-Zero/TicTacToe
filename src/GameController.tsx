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
		this.setState({
			type: 'STARTED',
			currentPlayerId: this.state.currentPlayerId === 0 ? 1 : 0,
			board
		})
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
			return 'Player ' + this._getPlayerName(result.winnerId) + 'has won!'
		}
	}
}
