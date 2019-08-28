import React from 'react'
import logo from './logo.svg'
import Cube from './Cube'
const Logos: React.FC = () => {
	return (
		<React.Fragment>
			<img src={logo} className='react-logo rotate' alt='logo' />
			<Cube />
		</React.Fragment>
	)
}

export default Logos
