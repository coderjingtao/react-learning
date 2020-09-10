import React,{useState, useEffect} from "react";
import Note from "./components/Note";
import noteService from "./services/noteService";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMsg,setErrorMsg] = useState(null);

    useEffect(() => {
        noteService.getAll().then(initNotes => {
            setNotes(initNotes);
            })
    },[]);

    const addNote = (event) => {
        event.preventDefault(); //阻止提交表单的默认操作，因为默认操作会导致页面重新加载
        const noteObject ={
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }
        noteService.create(noteObject).then(createdNote => {
            setNotes(notes.concat(createdNote));
            setNewNote('');
        })
    }

    const handleNewNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const updateNoteImportance = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = {...note, important: !note.important};
        noteService.update(id,changedNote).then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote));
        }).catch(error => {
            setErrorMsg(`Note ${id} update failed`);
            setTimeout(() => {
                setErrorMsg(null)
            },5000);
            setNotes(notes.filter(n => n.id !== id));
        })
    }

    return(
        <div>
            <h1>Notes</h1>
            <Notification message={errorMsg} />
            <div>
                <button onClick={()=> setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map( note => <Note key ={note.id} note={note} changeImportance={() => updateNoteImportance(note.id)}/>)}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNewNoteChange}/>
                <button type ="submit">Save</button>
            </form>
            <Footer />
        </div>

    )
}

export default App;