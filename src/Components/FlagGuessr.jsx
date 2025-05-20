import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import Back from './Back'


const FlagGuessr = ({ countries, flagGuessrNum }) => {

    // Game Finished
    const [hasGameFinished, setHasGameFinished] = useState(false)

    // fallback
    const [hasFinishedConfig, setHasFinishedConfig] = useState(false)

    // Random Countries

    const [randomCountries, setRandomCountries] = useState([])

    useEffect(() => {


        const uniqueNumbers = new Set();
        while (uniqueNumbers.size < flagGuessrNum) {
            uniqueNumbers.add(Math.floor(Math.random() * countries.length));
        }

        const result = Array.from(uniqueNumbers).map((num, i) => ({
            num,
            guessable: i % 4 === 0
        }));

        setRandomCountries(result)
    }, [])


    // Country to guess
    const [countryToGuess, setCountryToGuess] = useState([])

    const shuffle = (array) => {
        let shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    useEffect(() => {
        if (randomCountries.length > 0) {
            setCountryToGuess(randomCountries.slice(0, 4))
        }
    }, [randomCountries])

    useEffect(() => {
        if (countryToGuess.length == 4 && !hasFinishedConfig) {
            setCountryToGuess(prev => shuffle(prev))
            setHasFinishedConfig(true)
        }
    }, [countryToGuess])

    // Check if is Correct and Points

    const [points, setPoints] = useState(0)


    const checkIfIsCorrect = (id) => {
        if (countryToGuess.find(c => c.num == id).guessable) {
            setPoints(prev => prev + 1)

        }
        setHasFinishedConfig(false)
        setRandomCountries(prev => prev.slice(4))

        if (randomCountries.length == 4) {
            setHasGameFinished(true)
        }


    }


    if (!hasGameFinished) {
        return (
            <motion.div id="flagGuessr"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .2 }}
            >
                <Back  stopGame={true} />
                <p id="points">Points: {points}</p>
                <section id="game">
                    {hasFinishedConfig
                        && <h2 id="countryName">{countries[countryToGuess.find(c => c.guessable).num].name?.common}</h2>}
                    <div id="flags">
                        {hasFinishedConfig
                            && countryToGuess.map((c, i) => {
                                return <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: .2 }}

                                    key={`c${i}`}
                                    onClick={() => { checkIfIsCorrect(c.num) }}
                                    src={countries[c.num].flags?.png}
                                    style={countries[c.num].name?.common == 'Nepal' ? { width: '30%' } : null}
                                    alt="flag"></motion.img>
                            })}


                    </div>
                </section>
            </motion.div>
        )
    } else {
        return (
            <motion.div id="flagGuessrFinished"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: .2}}
            >
                <h1>You have scored {points}/{flagGuessrNum/4}!</h1>
                <Link to={'/'}>turn back to home</Link>
            </motion.div>
        )
    }
}

export default FlagGuessr;