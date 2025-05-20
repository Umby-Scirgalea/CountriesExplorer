import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react"
import {Link} from "react-router-dom"




import Back from "./Back";
import Flag from './Flag'

const NameAllCountries = ({ countries, time }) => {

    // Countries & Regions setup

    const [guessedCountries, setGuessedCountries] = useState([])
    const [inputValue, setInputValue] = useState('')

    const [countriesNumbers, setCountriesNum] = useState({
        europe: [...countries].filter(c => c.region == 'Europe').length,
        asia: [...countries].filter(c => c.region == 'Asia').length,
        africa: [...countries].filter(c => c.region == 'Africa').length,
        americas: [...countries].filter(c => c.region == 'Americas').length,
        oceania: [...countries].filter(c => c.region == 'Oceania').length,
        antarctic: [...countries].filter(c => c.region == 'Antarctic').length,
    })

    const [guessedCountriesNumbers, setGuessedCountriesNumbers] = useState({
        europe: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Europe').length,
        asia: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Asia').length,
        africa: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Africa').length,
        americas: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Americas').length,
        oceania: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Oceania').length,
        antarctic: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Antarctic').length,
    })

    useEffect(() => {
        setGuessedCountriesNumbers({
            europe: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Europe').length,
            asia: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Asia').length,
            africa: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Africa').length,
            americas: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Americas').length,
            oceania: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Oceania').length,
            antarctic: [...guessedCountries].filter(country => countries.find(c => c.name.common == country).region == 'Antarctic').length,
        })
    }, [guessedCountries])

    // Timer

    const [seconds, setSeconds] = useState(59)
    const [minutes, setMinutes] = useState(time - 1)

    const timerRef = useRef(null)

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    useEffect(() => {

        timerRef.current = setInterval(() => {
            setSeconds(prev => prev > 0 ? prev - 1 : 0);
        }, 1000)

        return () => clearInterval(timerRef.current)

    }, [])

    useEffect(() => {
        if (seconds == 0 && minutes == 0) {
            setGameFinished(true)
            clearInterval(timerRef.current)
            setMinutes(0)
            setSeconds(0)
        } else if (seconds == 0) {
            const sec59 = setTimeout(()=>{
                setSeconds(prev => 59);
                setMinutes(prev=> prev - 1)
            },1000)
            
        }
    }, [seconds,minutes])

    // Check if a country is guessed

    useEffect(() => {
        
        const matchedCountry = countries.find(c => c.name.common.replace('-', ' ').replace('Å', 'A').replace('ã', 'a').replace('é', 'e').replace('(', '').replace(')', '').replace(',','').replace('ç', 'c').replace('í', 'i').toLowerCase() == inputValue.toLowerCase())
        
        if (matchedCountry && !guessedCountries.find(c => c == matchedCountry.name?.common)) {
            setGuessedCountries(prev => [...prev, matchedCountry.name?.common])
            setInputValue('')
        }
    }, [inputValue])

    // Game Won or Loose

    const [gameFinished, setGameFinished] = useState(false)
    const [gameWon, setGameWon] = useState(false)

    useEffect(() => {
        if (guessedCountries.length === countries.length) {
            setGameWon(true)
            setGameFinished(true)
        }
    }, [guessedCountries])

    useEffect(() => {
        if (gameFinished) { 
            clearInterval(timerRef.current); 
        }

    }, [gameFinished])

    // Regions

    const regions = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania', 'Antarctic']


    if(!gameFinished){
        return (
            <motion.div id="nameAllCountries"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .2 }}

                inert={gameFinished}
            >
                <Back  stopGame={true} />
                <div id="time">
                    {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
                <nav>
                    <input ref={inputRef} autoComplete="off" spellCheck="false" autoCorrect="off" value={inputValue} type="text" name="countryInput" onChange={(e) => { setInputValue(e.target.value) }} />
                </nav>
                <section id="numbers">
                    <h2>{guessedCountries.length}/{countries.length}</h2>
                </section>
                <section id="countries">
                    {regions.map(r => {
                        if (r == 'Antarctic' && countries.length < 250) {
                            return;
                        } else {
                            return <ul key={r} id={r}>
                                <h1>{r}</h1>
                                <h3>{guessedCountriesNumbers[r.toLowerCase()]}/{countriesNumbers[r.toLowerCase()]}</h3>
                                {[...guessedCountries].reverse().map((country, i) => countries.find(c => c.name.common == country).region == r && <li key={`${r}${i}`}>{countries.find(c => c.name.common == country).flag} {country}</li>)}
                            </ul>

                        }
                    })}

                </section>
            </motion.div>
    )}else{
        return(
        <motion.div id="nameAllCountriesFinished"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .2 }}
            >
                <h1>{gameWon ? 'You named all the states! 🤩' : 'You didn\'t manage to name all the states 😢'}</h1>
                <h2>Score: {guessedCountries.length}/{countries.length}</h2>
                <Link to={'/'}>Turn back to Home</Link>
            </motion.div>
            )
    }
}

export default NameAllCountries;