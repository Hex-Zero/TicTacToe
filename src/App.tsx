import React from 'react'
import GameController from './GameController'
import Logos from './logos/Logos'

const App: React.FC = () => {
	return (
		<React.Fragment>
			<GameController />
			<Logos />
		</React.Fragment>
	)
}

export default App
