import React from 'react'
import logo from './logo.svg'
import GameController from './GameController'

const App: React.FC = () => {
	return (
		<React.Fragment>
			<GameController />
			<img src={logo} className='react-logo rotate' alt='logo' />
		</React.Fragment>
	)
}

export default App
