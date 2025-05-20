import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react"
import { useNavigate} from 'react-router-dom';

import Flag from "./Flag";


const CountryCard = ({ country }) => {

    const navigate = useNavigate()

    return (
            <motion.div
                className="countryCard"
                onClick={()=>{navigate(`/countries/${country.name.common}`)}}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <div>
                    <Flag country={country} />
                </div>
                <div>
                    <h1 className={country.name.common.length > 20 ? 'longNameH1' : null}>{country.name.common}</h1>
                </div>
            </motion.div>
    )
}

export default CountryCard;