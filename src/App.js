import React, { useState, useEffect } from 'react';
import colorsArray from './colorsArray.js';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
let quoteDbUrl ="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
function App() {
  const [quote, setQuote] = useState(
    'Remember that not getting what you want is sometimes a wonderful stroke of luck.'
  );
  const [author, setAuthor] = useState('Ralph Waldo Emerson');
  const [randomNumbers, setRandomNumber] = useState(0);
  const[quoteArray,setQuoteArray]=useState(null);
  const [accentColor, setAccentColor] = useState("#282c34");

  const fetchQuote = async(Url)=>{
    const response = await fetch(Url)
    const parsedJSON =await response.json()
    setQuoteArray(parsedJSON.quotes)
  }
  useEffect(() => {
    fetchQuote(quoteDbUrl);
  }, []);
  
  const getRandomQuote = () => {
    if (quoteArray && quoteArray.length > 0) {
      let randomInteger = Math.floor(quoteArray.length * Math.random());
      setRandomNumber(randomInteger);
      setAccentColor(colorsArray[randomInteger]);
      setQuote(quoteArray[randomInteger].quote);
      setAuthor(quoteArray[randomInteger].author);
    }
  };
  return (
    <div className="App" >
      <header className="App-header" style={{backgroundColor:accentColor,color:accentColor}}>
        <div id="quote-box" className="centered-box">
          {/* <h1>random Number: {randomNumbers}</h1> */}
          <p id = "text">"{quote}"</p>
          <p id= 'author'>- {author}</p>
          <button style={{backgroundColor:accentColor}} id='new-quote'onClick={()=>getRandomQuote()}> Generate a quote</button>
          <div className='btn'>
            <a id ='tweet-quote'  style={{backgroundColor:accentColor}} target='_blank' href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter}/></a>
          </div>
          
        </div>
      </header>
    </div>
  );
}

export default App;