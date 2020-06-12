import React from 'react';
import { Link } from 'react-router-dom';

class PlayMode extends React.Component{
	render(){
		return(
			<div className="playmode-content p-5 text-center">
				<h1>
					<span className="mark-x">x</span>
					<span className="mark-o">o</span>
				</h1>
				<h6>Choose your play mode</h6>
				<ul className="list-unstyled pt-4">
					<li><Link to="/pick-side/AI/" className="btn btn-info">With AI</Link></li>
					<li><Link to="/pick-side/2P/" className="btn btn-light">With a Friend</Link></li>
				</ul>
			</div>
		)
	}
}

export default PlayMode