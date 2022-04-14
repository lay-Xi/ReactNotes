
const SideBar = ({ notes, currentNoteId, openNote, newNote, deleteNote}) => {
  return (
    <section className='pane sidebar'>
      <div className='sidebar--header'>
        <h3>Notes</h3>
        <button className='new-note' onClick={newNote}>
          +
        </button>
      </div>
      {
        notes.map((note, index) => (
          <div key={note.id}>
            <div
              className={`title ${
                note.id === currentNoteId ? 'selected-note' : ''
              }`}
              onClick={() => openNote(note.id)}
            >
              <h4 className='text-snippet'>{note.body.split('\n')[0]}</h4>
              <button
                className='delete-btn'
                onClick={(event) => deleteNote(event, note.id)}
              >
                <i className='gg-trash trash-icon'></i>
              </button>
            </div>
         </div>
        ))          
      }
    </section>
  );  
}

export default SideBar;