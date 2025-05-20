import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


import Navbar from "../Components/Navbar";
import CountryCard from "../Components/CountryCard";
import QuizCard from "../Components/QuizCard";

const Home = ({ countries,
    isReturnedHome,
    setIsReturnedHome }) => {



    // Random Countries
    const [numbers, setNumbers] = useState(() => {
        const uniqueNumbers = new Set();
        while (uniqueNumbers.size < 6) {
            uniqueNumbers.add(Math.floor(Math.random() * 194));
        }
        return Array.from(uniqueNumbers);
    });



    const [randomCountries, setRandomCountries] = useState([...countries])

    // Set only independent countries
    useEffect(() => {
        setRandomCountries(prev => prev.filter(c => c.independent))
    }, [])

    // Set is Returned to Home 

    useEffect(() => {
        setIsReturnedHome(true)
    })

    return (
        <motion.div id="homePage"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { duration: 1 }
            }}

        >
            <Navbar />

            {/* Banner */}
            <motion.div
                id="banner"

                initial={{ opacity: 0 }}
                animate={{
                    transition: { duration: 1 },
                    opacity: 1
                }}
            >
                <motion.h1
                    initial={{
                        translateY: -100
                    }}
                    animate={{
                        translateY: 0,
                        transition: { duration: 1 }
                    }}>Countries Explorer</motion.h1>
            </motion.div>

            {/* Quiz */}
            <motion.div id="quizPart">
                <div>
                    <p>You can challenge <br />yourself with <Link to='/quiz'>quizzes</Link></p>
                </div>
                <div>
                    <QuizCard country={randomCountries[numbers[0]]} />
                    <QuizCard country={randomCountries[numbers[1]]} />
                    <QuizCard country={randomCountries[numbers[2]]} />
                </div>
            </motion.div>

            {/* Informations */}
            <motion.div id="informationsPart">
                <div>
                    <CountryCard country={randomCountries[numbers[3]]} />
                    <CountryCard country={randomCountries[numbers[4]]} />
                    <CountryCard country={randomCountries[numbers[5]]} />
                </div>
                <div>
                    <p>Or maybe you want to <br /> learn something <Link to='/countries'>new</Link></p>
                </div>
            </motion.div>

        </motion.div>
    )
}

export default Home;