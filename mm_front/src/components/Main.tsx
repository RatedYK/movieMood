import { useState } from 'react'
import { filterPrompt } from '../utilities'
import MovieCard from './MovieCard'
import ErrorPopUp from './ErrorPopUp'
import Keywords from './Keywords'
import '../styles/Main.css'



const Main = () => {
    const [userPrompt, setUserPrompt] = useState('')
    const [movieData, setMovieData] = useState<any>([])
    const [showMovieCards, setShowMovieCards] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)



    // FUNCTIONS
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPrompt(e.target.value)
    }

    function toggleError() {
        setShowError(!showError)
    }

    function closeCards() {
        setShowMovieCards(false)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
      
        const body = filterPrompt(userPrompt);
      
        try {
          const response = await fetch('https://moviemood-back.onrender.com/movies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
      
          if (!response.ok) {
            throw new Error('Request failed with status: ' + response.status);
          }
      
          const data = await response.json();
      
          setMovieData(data);
          setShowMovieCards(true);
        } catch (error) {
            console.error(error);
            toggleError();
        }
        setUserPrompt('');
      }
      

 



  return (
    <main className='main--container'>
        <h1 className='main--title'>Movie Mood</h1>
        <p className='main--question'>Enter below the type of movie you want to watch.</p>
        <form className='user--form' onSubmit={handleSubmit}>
            <input className='user--prompt' type='text' placeholder='e.g. action starring tom cruise' onChange={handleChange} value={userPrompt} />
            <button className='user--search-btn'>Search</button>
        </form>
        <Keywords />
        {showMovieCards && <MovieCard movieData={movieData} onClose={closeCards} />}
        {showError && <ErrorPopUp toggleError={toggleError} title='No results found!' message='Try limiting your search and using more keywords, take a look at the "How To Use" to find out more.'/>}
    </main>
  )
}

export default Main