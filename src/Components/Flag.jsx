import { useState,useEffect } from "react"

const Flag = ({ country}) => {
    // Country flag
    const [flagLink, setFlagLink] = useState(null)


    useEffect(() => {
        setFlagLink(country.flags.png)
    }, [country])

    return(
        <img className="flag" src={flagLink} alt="flag"/>
    )
}

export default Flag;