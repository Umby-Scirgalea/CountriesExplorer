import { motion } from "motion/react"
import Flag from "./Flag";

const QuizCard = ({ country }) => {
    return (
        <motion.div className="quizCard"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <Flag country={country} />
                <h1 style={country.name.common.length > 8 ? {fontSize: '1.5rem'} : {fontSize:'2rem'}}>{country.name.common}</h1>
            
        </motion.div>
    )
}

export default QuizCard;