import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';


const WordSearch = () => {

    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;

    const [word, setWord] = useState('');

    const onChange = (e) => {
        setWord(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(word === ''){
            console.log('We enter here');
            setAlert('Please enter a word before searching', 'dark');
        } else {
            console.log('We are going to find results for the word')
        }
    }

    return (
        
        <div className='form-container'>
            <h1>
                Find a <span className="text-primary">Word</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" name="word" value={word} onChange={onChange}/>
                </div>
                
                <input type="submit" value="Search" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default WordSearch
