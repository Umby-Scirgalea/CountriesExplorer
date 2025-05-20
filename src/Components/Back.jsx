import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"


const BackToHome = ({ route = '/', stopGame = false }) => {
    if (!stopGame) {
        return (
            <div id="back" >
                <Link to={route}><i className="fa fa-arrow-left"></i></Link>
            </div>
        )
    } else {
        const [showStopGame, setShowStopGame] = useState(false)
        
        // Prevent Scrolling
        useEffect(()=>{
            !showStopGame ? document.body.style.overflow = '' : document.body.style.overflow = 'hidden';   
        },[showStopGame])
        
        return (
            <>
                {showStopGame &&
                    <motion.div id="stopGame"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration:.2}}
                    >
                        <h1>Are you sure want to quit game?</h1>
                        <div>
                            <Link onClick={()=>{setShowStopGame(prev=>!prev)}} to={route}>Yes</Link>
                            <button onClick={()=>{setShowStopGame(prev=> !prev)}}>No</button>
                        </div>
                    </motion.div>
                }
                <div id="back" >
                    <i className="fa fa-arrow-left"
                    onClick={()=>{setShowStopGame(prev=>!prev)}}
                    ></i>
                </div>
            </>
        )
    }
}

export default BackToHome;