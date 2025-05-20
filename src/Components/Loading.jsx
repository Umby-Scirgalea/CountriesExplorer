import { motion} from "motion/react"


const Loading = ()=>{
    return(
        <motion.div 
        id="loadingPage"
        initial={{opacity: 0}}
        animate={{
            opacity: 1,
            transition:{duration: 1}
        }}
        >
        <p>Loading... </p>
      </motion.div>
    )
}

export default Loading;