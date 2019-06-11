import React, { Component } from 'react';
import './styles/Note.css';
import PropTypes from 'prop-types';

class Note extends Component {

	constructor(props) {
		super(props);
		this.noteContent = props.noteContent;
		this.noteId = props.noteId;
	}

	handleRemoveNote(id) {
		const response = window.confirm('¿Estás seguro de eliminar?')
		if(response) {
			this.props.removeNote(id);
		}
		else {
			return;
		}
	}

	render(props) {
		return (
			<div className="Note">
				<span
					className="btn-close"
					onClick={() => this.handleRemoveNote(this.noteId)}
				>
				&times;
				</span>
				<p>{this.noteContent}</p>
			</div>
		)
	}

}

Note.propTypes = {
	noteContent: PropTypes.string
};

export default Note;
