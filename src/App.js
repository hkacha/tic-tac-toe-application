import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PlayMode from './components/PlayMode.js';
import PickSide from './components/PickSide.js';
import PlayArea from './components/PlayArea.js';

import "bootstrap/dist/css/bootstrap.css";
import './assets/css/App.css';

export default class App extends React.Component {

	render(){
		return(
			<Router>
				<div className="container">
					<div className="row">
						<div className="col-lg-4 offset-lg-4">
							<Switch>
								<Route exact path="/" component={PlayMode} />
								<Route exact path="/pick-side/:type" component={PickSide} />
								<Route exact path="/play-area/:type/:side" component={PlayArea} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		)
	}
}