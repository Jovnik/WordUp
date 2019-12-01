import React, { useContext, useState } from 'react';
import WordContext from '../../context/words/wordContext';
import AlertContext from '../../context/alert/alertContext';
import axios from 'axios';

const MyWordsItem = ({ word }) => {
    const wordContext = useContext(WordContext);
    const alertContext = useContext(AlertContext);

    const { removeWord } = wordContext;
    const { setAlert } = alertContext;

    const [hover, setHover] = useState(false);
    
    // Method 1: use the useState hook to create a hover state, which is changed on mouse over (setHover(true)) and mouse out (setHover(false)) on the parent word container div.
    // Then for the div that contains the remove button, use { hover && <div>...</div> } to control the output

    // Method 2: use createRef to create a ref for the div that contains the remove button, and change its opacity on the containing div hover
    

    const clearOnHover = React.createRef();

    const toggleHover = (e) => {
        clearOnHover.current.style.opacity = '1';
        clearOnHover.current.style.cursor = 'pointer';
    }
    const untoggleHover = (e) => {
        clearOnHover.current.style.opacity = '';
        clearOnHover.current.style.cursor = '';
    }

    const removeOnClick = () => {
        console.log(word._id, word.name);
        const msg = `You have successfully removed the word ${word.name} (${word.partOfSpeech})`;
        // setAlert(msg, 'success');
        // maybe link to the top of the page after removing a word

        // going to create a function here from the words context that removes the word
        removeWord(word._id, word.name);
    }

    // const expand = (e) => {
    //     e.target.style.width = '50%';
    // }

   

    return (
        <div className="word-container" onMouseOver={toggleHover} onMouseOut={untoggleHover}>
            <div className="word-info">
                <h3 className="text-primary">{word.name}</h3>
                <p>Part of Speech: <b>{word.partOfSpeech}</b></p>
                <p><b>{word.definitions[0]}</b></p>
                { word.examples && <p>eg. <i>{word.examples}</i></p> }
            </div>
            <div className="word-remove">
                <i onClick={removeOnClick} ref={clearOnHover} className="fas fa-times fa-2x remove-btn"></i>
            </div>
        </div>
    )
}

//     <div className="word-container" onMouseOver={toggleHover} onMouseOut={untoggleHover}>
//         <div className="word-info">
//             <h3 className="text-primary">{word.name}</h3>
//             <p>Part of Speech: <b>{word.partOfSpeech}</b></p>
//             <p><b>{word.definitions[0]}</b></p>
//             { word.examples && <p>eg. <i>{word.examples}</i></p> }
//         </div>
//         { hover && (<div className="word-remove">
//             <i onClick={handleClick} className="fas fa-times fa-2x remove-btn"></i>
//         </div>) }
//     </div>
// )
export default MyWordsItem
