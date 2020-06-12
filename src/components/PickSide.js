import React from 'react';
import { Link } from 'react-router-dom';
import { CustomInput } from 'reactstrap';

export default class PickSide extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			gameType: this.props.match.params.type,
			pickedSide: ''
		}
	}

	handleMarks = (e) => {
		this.setState({
			pickedSide: e.target.value
		})
	}

	render(){
		var { gameType, pickedSide } = this.state;

		return(
			<div className="playside-content p-5 text-center">
				<h6>Pick your side</h6>
				<div className="px-4">
					<div className="clearfix">
						<div className="float-left">
							<h1><span className="marks mark-x">x</span></h1>
							<CustomInput type="radio" name="marks" id="exampleCustomRadio" value="x" onClick={(e) => this.handleMarks(e)} />
						</div>
						<div className="float-right">
							<h1><span className="marks mark-o">o</span></h1>
							<CustomInput type="radio" name="marks" id="exampleCustomRadio2" value="o" onClick={(e) => this.handleMarks(e)} />
						</div>
					</div>
				</div>
				<ul className="list-unstyled pt-4">
					<li><Link to={`/play-area/${gameType}/${pickedSide}`} className="btn btn-light">Continue</Link></li>
				</ul>
			</div>
		)
	}
}