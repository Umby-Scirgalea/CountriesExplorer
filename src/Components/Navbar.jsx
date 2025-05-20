import { motion} from "motion/react"
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <motion.nav 
        id="navbar"
        initial={{translateY: -100}}
        animate={{
            translateY: 0,
            transition: {duration: 1}
        }}>
            <Link to={'/countries'}>countries</Link>
            <Link to={'/quiz'}>quiz</Link>
            <Link to={'/info'}>info</Link>
        </motion.nav>

    )
}

export default Navbar;