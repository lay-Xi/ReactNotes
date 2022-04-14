import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import { nanoid } from 'nanoid';
import 'react-mde/lib/styles/css/react-mde-all.css';

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  );
  const [status, setStatus] = useState('loading');

  // useEffect(() => {
  //   var time = setTimeout(setStatus('idle'), 30);
  //   const resetTimer = () => {
  //     setStatus('active');
  //     clearTimeout(time);
  //     //300000 is 5 mins
  //     time = setTimeout(setStatus('idle'), 30);
  //   }
  //   window.onload = resetTimer();
  //   document.onmousemove = resetTimer();
  //   document.onkeydown = resetTimer();
  //   document.onmousedown = resetTimer();
  // }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    setStatus('pending');
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
      lastEdit: Date.now()
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  const sortNotes = () => {
    setNotes((notes) => notes.sort((a,b) => {
      return b.lastEdit - a.lastEdit
    }))
  }

  const updateNote = (text) => {
    setStatus('editing');  
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text, lastEdit: Date.now() }
          : oldNote;
      })
    );
    sortNotes();
  }

  const openNote = (noteId) => {
    setStatus('pending');
    setCurrentNoteId(noteId);
  }

  const deleteNote = (event, noteId) => {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  if(status === 'idle'){
    alert('You are now idle');
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction='horizontal' className='split'>
          <Sidebar
            notes={notes}
            currentNoteId={currentNoteId}
            openNote={openNote}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button className='first-note' onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
