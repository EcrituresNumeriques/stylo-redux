import { h, Component } from 'preact';
import style from './style';
let jsdiff = require('diff');

export default class Home extends Component {
	constructor(props) {
		super(props);
    this.plotDiff = this.plotDiff.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.state = {firstVersion:'Contrary to belief, Lorem Ipsum is not just a random text. It has roots in a piece of classical Latin literature from 75 BC, making it over 2000 years old.',nextVersion:'Contrary to popular belief, Lorem Ipsum is not just a random text. It has roots in a piece of classical Latin literature from 75 BC, making it over 2000 years old.'};
	}

	handleChange = function(e){
		this.setState({nextVersion: e.target.value});
	}

	plotDiff = function(one2, other){
		let diff = jsdiff.diffChars(one2, other);
		let start = 0;
		let end = 0;
		let operations = [];
		for (let i=0;i<diff.length;i++){
			start = end;
			if (diff[i].removed){
				operations.push({type:'delete',from:start,count:diff[i].count,text:diff[i].value})
			}
			else if (diff[i].added) {
				end = start + diff[i].count;
				operations.push({type:'add',from:start,count:diff[i].count,text:diff[i].value})
			}
			else {
				end = start + diff[i].count;
			}
		}
		return(
			<div>
				{operations.map((operation)=>(<pre>{operation.type} ({operation.from},{operation.count}): {operation.text} </pre>))}
			</div>)
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<p>{this.state.firstVersion}</p>
				<textarea value={this.state.nextVersion} onInput={this.handleChange} style="width: 100%;height: 3em;"></textarea>
				{this.plotDiff(this.state.firstVersion, this.state.nextVersion)}
			</div>
		);
	}
}
