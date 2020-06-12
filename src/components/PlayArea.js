import React from 'react';

var patterns = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

var AIScore = { 2: 1, 0: 2, 1: 0 };

class Column extends React.Component {

	handleClickbox = (e) => {
		if (!this.props.active) {
			document.querySelector("#message1").style.display = "none";
			document.querySelector("#message2").innerHTML = "Game is already over! Reset if you want to play again.";
			document.querySelector("#message2").style.display = "block";
			return false;
		} else if (this.props.marking === 2) {
			this.props.onNewMove(parseInt(e.target.id));
		}
	}

	render(){
		return(
			<div className="col" onClick={this.handleClickbox}>
				<div className={this.props.iconMap[this.props.marking][0]} id={this.props.id}>
					{this.props.iconMap[this.props.marking][1]}
				</div>
			</div>
		)
	}
}

class Row extends React.Component {

	render() {
		const cols = [];
		for (var i = 0; i < 3; i++) {
			var id = this.props.row * 3 + i;
			var marking = this.props.boardState[id];
			cols.push(
				<Column
					key={id + "-" + marking}
					id={id + "-" + marking}
					marking={marking}
					onNewMove={this.props.onNewMove}
					active={this.props.active}
					iconMap={this.props.iconMap}
				/>
			);
		}

		return (
			<div className="row">{cols}</div>
		);
	}
}


export default class PlayArea extends React.Component {

	constructor(props){
		super(props)

		var currentPick;
		var otherPick;
		var iconMap;
		if (this.props.match.params.side === "x"){
			currentPick = "x";
			otherPick = "o";
			iconMap = {
				0: ["marking mark-x", currentPick],
				1: ["marking mark-o", otherPick],
				2: ["marking", " "]
			}
		} else {
			currentPick = "o";
			otherPick = "x";
			iconMap = {
				0: ["marking mark-o", currentPick],
				1: ["marking mark-x", otherPick],
				2: ["marking", " "]
			}
		}

		this.state = {
			boardState: new Array(9).fill(2),
			turn: 0,
			active: true,
			mode: this.props.match.params.type,
			iconMap: iconMap
		};
	}

	handleBoard = () => {
		var won = false;
		patterns.forEach(pattern => {
			var firstMark = this.state.boardState[pattern[0]];
			if (firstMark !== 2) {
				var marks = this.state.boardState.filter((mark, index) => {
					return pattern.includes(index) && mark === firstMark;
				});

				if (marks.length === 3) {
					document.querySelector("#message1").innerHTML = this.state.iconMap[marks[0]][1] + " wins!";
					document.querySelector("#message1").style.display = "block";
					pattern.forEach(index => {
						var id = index + "-" + firstMark;
						document.getElementById(id).parentNode.style.background = "#d4edda";
					});

					this.setState({ active: false });
					won = true;
				}
			}
		});

		if (!this.state.boardState.includes(2) && !won) {
			document.querySelector("#message2").innerHTML = "Game Over - It's a draw";
			document.querySelector("#message2").style.display = "block";
			this.setState({ active: false });
		} else if (this.state.mode === "AI" && this.state.turn === 1 && !won) {
			this.handleAIMethod();
		}
	}

	handleAIMethod = () => {
		var emptys = [];
		var scores = [];
		this.state.boardState.forEach((mark, index) => {
			if (mark === 2) emptys.push(index);
		});

		emptys.forEach(index => {
			var score = 0;
			patterns.forEach(pattern => {
				if (pattern.includes(index)) {
					var xCount = 0;
					var oCount = 0;
					pattern.forEach(p => {
						if (this.state.boardState[p] === 0) xCount += 1;
						else if (this.state.boardState[p] === 1) oCount += 1;
						score += p === index ? 0 : AIScore[this.state.boardState[p]];
					});
					if (xCount >= 2) score += 10;
					if (oCount >= 2) score += 20;
				}
			});
			scores.push(score);
		});

		var maxIndex = 0;
		scores.reduce(function(maxVal, currentVal, currentIndex) {
			if (currentVal >= maxVal) {
				maxIndex = currentIndex;
				return currentVal;
			}
			return maxVal;
		});
		
		this.handleClickbox(emptys[maxIndex]);
	}
	
	handleClickbox = (id) => {
		this.setState(prevState => {
			return {
				boardState: prevState.boardState.slice(0, id).concat(prevState.turn).concat(prevState.boardState.slice(id + 1)),
				turn: (prevState.turn + 1) % 2
			};
		}, () => {this.handleBoard();});
	}

	render(){
		const rows = [];
		for (var i = 0; i < 3; i++) {
			rows.push(<Row row={i} boardState={this.state.boardState} onNewMove={this.handleClickbox} active={this.state.active} key={i} iconMap={this.state.iconMap} />
			);
		}

		return(
			<React.Fragment>
				<div className="row section-header mt-5 mb-2">
					<div className="col-lg-4 text-center">
						<h6 className="mt-1">Alex</h6>
					</div>
					<div className="col-lg-4 text-center">
						<h6 className="score-board">0 - 0</h6>
					</div>
					<div className="col-lg-4 text-center">
						<h6 className="mt-1">AI</h6>
					</div>
				</div>
				<div className="board">{rows}</div>
				<p className="alert alert-success" role="alert" id="message1"></p>
				<p className="alert alert-info" role="alert" id="message2"></p>
			</React.Fragment>
		)
	}
}