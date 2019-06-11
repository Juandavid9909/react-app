import React, { Component } from 'react';
import './styles/NoteForm.css';

class NoteForm extends Component {
	constructor(props) {
		super();
		this.state = {
			newNoteText: ''
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	handleUserInput(e) {
		this.setState({
			newNoteText: e.target.value
		})
	}

	addNote() {
		this.props.addNote(this.state.newNoteText);
		this.setState({
			newNoteText: ''
		});
		this.textInput.focus();
	}

	componentDidMount() {
		this.textInput.focus();
	}

	render() {
		return (
			<div className="NoteForm">
				<input
					placeholder="Escribe una tarea"
					className="noteInput"
					ref={input => { this.textInput = input;}}
					value={this.state.newNoteText}
					onChange={this.handleUserInput}
					type="text"/>
				<button
					onClick={this.addNote}
					className="noteButton">
					Agregar Tarea
				</button>
			</div>
		)
	}
}

export default NoteForm;
