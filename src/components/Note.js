import React from "react";

const Note = ({ note,changeImportance }) => {
    const label = note.important ? 'make not important' : 'make important';

    return (
        <li className='note'>{note.content}<button onClick={changeImportance}>{label}</button></li>
    )
}

export default Note