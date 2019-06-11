import React, { Component } from 'react';
import './styles/home.css';

import fire from '../config/Fire';
import 'firebase/database';

import Note from './Note';
import NoteForm from './NoteForm';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: []
    }

    this.db = fire.database().ref().child('notes');

    this.addNote = this.addNote.bind(this);
		this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    this.db.on('child_added', snap => {
      console.log(snap.val());
      if(snap.val().user == localStorage.getItem('user')) {
        notes.push({
          noteId: snap.key,
          noteContent: snap.val().noteContent
        });
        this.setState({ notes });
      }
    });

    this.db.on('child_removed', snap => {
      for(let i = 0; i < notes.length; i++) {
        if(notes[i].noteId = snap.key) {
          notes.splice(i, 1);
        }
      }
      this.setState({ notes });
    });
  }

  logout() {
    fire.auth().signOut();
  }

  addNote(note) {
		/*
		let { notes } = this.state;
		notes.push({
			noteId: notes.length + 1,
			noteContent: note
		});
		this.setState({
			notes
		});
		*/
    this.db.push().set({ noteContent: note, user: localStorage.getItem('user') });
	}

	removeNote(noteId) {
    this.db.child(noteId).remove();
	}

  render() {
    return(
      <div className="col-md-6">
        <nav className="contenedor-navegacion">
          <a href="#" className="item">TodoList</a>
          <a className="item" onClick={ this.logout }>Cerrar Sesión</a>
        </nav>

        <div className="notesContainer">
          <div className="notesBody">
            <ul>
              { this.state.notes.map(note => {
                return (
                  <Note noteContent={ note.noteContent } noteId={ note.noteId } key={ note.noteId }
                      removeNote={ this.removeNote }/>
                )
              }) }
            </ul>
          </div>

          <div className="notesFooter">
            <NoteForm addNote={this.addNote}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
