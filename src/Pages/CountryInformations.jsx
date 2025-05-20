import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from 'react-router-dom';



import Back from '../Components/Back'

const CountryInformations = ({ countries }) => {

    // Country 
    const { countryName } = useParams()
    const country = countries.find(c => c.name.common === countryName)



    // Config
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])


    // Native Name

    const [nativeName, setNativeName] = useState('')

    useEffect(() => {
        const nativeNames = Object.values(country.name?.nativeName || {});

        if (
            nativeNames.length > 1 &&
            nativeNames[0]?.official !== country.name?.common &&
            nativeNames[1]?.official
        ) {
            setNativeName(nativeNames[1].official);
        } else if (nativeNames[0]?.official) {
            setNativeName(nativeNames[0].official);
        }
    }, [country]);

    // Navigate

    const navigate = useNavigate()

    return (
        <AnimatePresence>
            <motion.div id='countryInformations'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .2 }}
                exit={{opacity:0}}
            >
                <Back route={'/countries'} />
                <section id='mainInformations'>
                    <div id='images'>
                        <img id='flag' src={country.flags.png} alt="flag" />
                        {Object.values(country.coatOfArms).length > 0 && 
                            <img id='coatOfArms' src={country.coatOfArms.png} alt="coatOfArms"/>}
                    </div>
                    <div id='titles'>
                        {/* Official Name + cca3 */}
                        <h1>{country.name.official} <span className='cca3'>{country.cca3}</span></h1>
                        {/* Original name */}
                        {country.name.official != nativeName ? <h2>{nativeName}</h2> : null}
                        {/* United Nations Member */}
                        {country.unMember ? <h4>UN Member</h4> : null}
                        {/* Continent */}
                        <h3>{country.continents[0]}</h3>
                        

                    </div>
                </section>
                <div id='informations'>
                    {/* Capital */}
                    {country.capital &&
                        <p><span className='informationSpan'>Capital:</span> {country.capital[0]}</p>}
                    {/* Population */}
                    <p><span className='informationSpan'>Population:</span> {country.population} peoples</p>
                    {/* Languages */}
                    {country.languages &&
                        <p><span className='informationSpan'>Languages: </span> {Object.values(country.languages).map((l, i) => `${l}${i != Object.values(country.languages).length - 1 ? ', ' : ''}`)}</p>}
                    {/* Currency */}
                    {country.currencies &&
                        <p><span className='informationSpan'>Currency:</span> {Object.values(country.currencies)[0].name} <span className='currency'>{Object.values(country.currencies)[0].symbol}</span></p>}
                    {/* Area */}
                    <p><span className='informationSpan'>Area:</span> {country.area} km<sup>2</sup></p>
                    {/* Time Zones */}
                    <p><span className='informationSpan'>Timezones:</span> {country.timezones.length === 1 && String(country.timezones[0])}</p>
                    {country.timezones.length > 1 && <ul>
                        {country.timezones.map((t, i) => <li key={`timezone${i}`}>{t}</li>)}
                    </ul>}
                    {/* Emoji */}
                    {country.flag &&
                        <p><span className='informationSpan'>Emoji:</span> {country.flag}</p>
                    }
                    {/* INTERNET tld */}
                    {country.tld &&
                        <p><span className='informationSpan'>Internet TLD:</span> {country.tld[0]}</p>}
                    {/* Borders */}
                    {country.borders
                        && <section id='borders'>
                            <h2><span className='informationSpan'>Borders:</span></h2>
                            <div id='bordersFlags'>{country.borders.map((b, i) => <img style={{ cursor: 'pointer' }} onClick={() => { window.scrollTo({top:0});navigate(`/countries/${countries.find(c => c.cca3 == b).name.common}`) }} key={`border${i}`} src={countries.find(c => c.cca3 == b).flags.png} alt='borderFlag'></img>)}</div>
                        </section>}

                </div>


            </motion.div>
        </AnimatePresence>
    )
}

export default CountryInformations;