import { useState, useEffect } from "react";
import { motion } from "motion/react"


import Back from "../Components/Back";
import Game from "../Components/Game";

const Quiz = ({ countries }) => {

    // Has Finished Config
    const [hasFinishedConfig, setHasFinishedConfig] = useState(false)

    // Quiz type select
    const [hasSelectedType, setHasSelectedType] = useState(false)
    const [quizType, setQuizType] = useState('')

    // Non Sovereign Territories
    const [hasSelectedTerritories, setHasSelectedTerritories] = useState(false)
    const [allowNonIndependentCountries, setAllowNonSovereignTerritories] = useState(false)

    // time
    const [time, setTime] = useState(15)
    const [hasSelectedFinalOption, setHasSelectedFinalOption] = useState(false)

    useEffect(() => {
        if (quizType != '') {
            setHasSelectedType(true)
        }
    }, [quizType])

    useEffect(() => {
        if (hasSelectedTerritories && hasSelectedType && hasSelectedFinalOption) {
            setHasFinishedConfig(true)
        }
    }, [hasSelectedTerritories, hasSelectedType, hasSelectedFinalOption])


    // Flag Guessr Number
    const [flagGuessrNum, setFlagGuessrNum] = useState(10);

    if (!hasFinishedConfig) {
        return (
            <motion.div id="quizSetup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .5 }}
            >
                <Back/>
                {!hasSelectedType &&
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5 }}
                    >
                        <h2>Select a game:</h2>
                        <ul>
                            <li onClick={() => { setQuizType('flagGuessr') }}>Flag Guesser</li>
                            <li onClick={() => { setQuizType('nameAllCountries') }}>Name all countries</li>

                        </ul>
                    </motion.section>
                }
                {hasSelectedType && !hasSelectedTerritories &&
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5 }}
                    >
                        <ul>
                            <h2>Allow non Independent Territories?</h2>
                            <li onClick={() => { setAllowNonSovereignTerritories(true); setHasSelectedTerritories(true) }}>Yes</li>
                            <li onClick={() => { setAllowNonSovereignTerritories(false); setHasSelectedTerritories(true) }}>No</li>
                        </ul>
                    </motion.section>
                }
                {hasSelectedTerritories && hasSelectedType && !hasSelectedFinalOption && quizType == 'nameAllCountries'
                    && <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5 }}
                    >
                        <ul>
                            <h2>Select time:</h2>

                            <li onClick={() => { setTime(10); setHasSelectedFinalOption(true); }}>10m</li>
                            <li onClick={() => { setTime(15); setHasSelectedFinalOption(true); }}>15m</li>
                            <li onClick={() => { setTime(30); setHasSelectedFinalOption(true); }}>30m</li>

                        </ul>
                    </motion.section>
                }
                {hasSelectedTerritories && hasSelectedType && !hasSelectedFinalOption && quizType == 'flagGuessr'
                    && <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5 }}>
                        <ul>
                            <h2>Select number of Questions:</h2>
                            <li onClick={() => { setFlagGuessrNum(10 * 4); setHasSelectedFinalOption(true); }}>10</li>
                            <li onClick={() => { setFlagGuessrNum(20 * 4); setHasSelectedFinalOption(true); }}>20</li>
                            <li onClick={() => { setFlagGuessrNum(30 * 4); setHasSelectedFinalOption(true); }}>30</li>

                        </ul>
                    </motion.section>
                }

            </motion.div>
        )
    } else {
        return (
            <Game countries={countries} allowNonIndependentCountries={allowNonIndependentCountries} quizType={quizType} time={time} flagGuessrNum={flagGuessrNum}/>
        )
    }
}

export default Quiz;