import { motion } from "motion/react"
import { useEffect, useRef } from "react"


const Search = ({ searchValue, setSearchValue, setShowSearch }) => {
    
    const searchBarRef = useRef(null)

    const setFocus = ()=>{
        searchBarRef.current?.focus();
    }

    useEffect(() => {
        setFocus();
    }, []);

    return (



        <motion.div id='search'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
        >
            <input ref={searchBarRef} type="text" value={searchValue} placeholder="Search for a country" autoComplete='none' onChange={(e) => { setSearchValue(e.target.value) }} />
            <button onClick={()=>{setSearchValue(''); setFocus()}} style={searchValue == '' ? {display:'none'} : {display:'block'}}><i className="fa fa-times"></i></button>
        </motion.div>

    )
}

export default Search;