import React from 'react'
import js from './js.svg'
import type from './type.svg'
const Cube: React.FC = () => {
	return (
		<div className='main-cubediv'>
			<div className='box-cubediv'>
				<div id='Front'>
					<img src={js} className='cube-logo' alt='logo' />
				</div>
				<div id='Back'>
					{' '}
					<img src={js} className='cube-logo' alt='logo' />
				</div>
				<div id='Left'>
					<img src={type} className='cube-type' alt='logo' />
				</div>
				<div id='Right'>
					<img src={type} className='cube-type' alt='logo' />
				</div>
				<div id='Top' />
				<div id='Bottom' />
			</div>
		</div>
	)
}

export default Cube
