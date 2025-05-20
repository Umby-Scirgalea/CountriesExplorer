import { useState, useEffect } from "react"

import NameAllCountries from "./NameAllCountries"
import FlagGuessr from "./FlagGuessr"

const Game = ({countries, allowNonIndependentCountries,quizType,time,flagGuessrNum})=>{

    const [gameCountries,setGameCountries] = useState([])

    useEffect(()=>{
        if(!allowNonIndependentCountries){
            setGameCountries([...countries].filter(c => c.independent))
        }else{
            setGameCountries([...countries])
        }
    },[])

    if(gameCountries.length !== 0){
        if(quizType == 'flagGuessr'){
        return(
            <FlagGuessr countries={gameCountries} flagGuessrNum={flagGuessrNum}/>
        )
    }else{
        return(
            <NameAllCountries countries={gameCountries} time={time}/>
        )
    }
}
}

export default Game;