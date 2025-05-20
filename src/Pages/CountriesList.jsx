import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"



import CountryCard from "../Components/CountryCard";
import classnames from 'classnames'
import Back from "../Components/Back";
import Search from "../Components/Search"


const CountriesList = ({ countries,
  setOnlyIndependent,
  onlyIndependent,
  region,
  setRegion,
  searchValue,
  setSearchValue,
  isReturnedHome,
  setIsReturnedHome,
  sortingMethod,
  setSortingMethod }) => {

  // Num of Sorted Countries
  const [countriesNum, setCountriesNum] = useState(0)

  // Initial Config
  useEffect(() => {
    if (isReturnedHome) {
      window.scrollTo({ top: 0 });
      setSearchValue('')
      setOnlyIndependent(true)
      setRegion('all')
    }

  }, [])

  useEffect(() => {
    setCountriesNum(countries.length)
  }, [countries])

  const handleSovereignStates = () => {
    setOnlyIndependent(prev => !prev)
  }

  // Toggle Scrolling

  const [scroll, setScroll] = useState(false)

  const toggleScrolling = () => {
    setScroll(prev => !prev)
  }

  useEffect(() => {
    if (!isReturnedHome) {
      setScroll(true)
    }
  }, [])

  useEffect(() => {
    scroll ? document.body.style.overflow = '' : document.body.style.overflow = 'hidden';
  }, [scroll])

  // Search

  const [showSearch, setShowSearch] = useState(false)

  return (
    <motion.div
      id="countriesList"
      initial={isReturnedHome ? { scale: 2 } : { opacity: 0 }}
      animate={isReturnedHome ? { scale: 1 } : { opacity: 1 }}
      transition={isReturnedHome ? { duration: 1, onComplete: () => { toggleScrolling(); setIsReturnedHome(false) } } : { duration: .2 }}
    >
      <Back />
      <div id="optionBar">

        <div id="upperOptions">

          <p id="totalCountries">Total Countries: <span>{countriesNum}</span></p>

          <button id="searchCountry" onClick={() => { setShowSearch(prev => !prev) }}  ><i className={classnames({ 'fa fa-search': !showSearch, 'fa fa-times': showSearch })}></i></button>


        </div>

        <AnimatePresence>
          {showSearch && <Search searchValue={searchValue} setSearchValue={setSearchValue} setShowSearch={setShowSearch} />}
        </AnimatePresence>

        <div id="options">
          <span className={classnames('optionButton', { 'optionChecked': onlyIndependent })} onClick={handleSovereignStates}>Only Independents</span>
          
          {/* Region Selector */}
          <select className="optionButton" name="region" id="region" value={region} onChange={(e) => { setRegion(e.target.value) }}>
            <option value="all">All Regions</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
          
          {/* Sort */}
          <select name="sort" id="sort" className="optionButton" value={sortingMethod} onChange={(e)=>{setSortingMethod(e.target.value)}}>
            <option value="nameAscending">Name Ascending</option>
            <option value="nameDescending">Name Descending</option>
            <option value="areaAscending">Land Area Ascending</option>
            <option value="areaDescending">Land Area Descending</option>

          </select>
        </div>

      </div>

      <div id="clear">
        {!showSearch && searchValue != '' && <button onClick={() => setSearchValue('')}>clear search value</button>}
      </div>

      <div id="list">
        {countries.map((e, i) =>
          <CountryCard key={i} country={e} />
        )}
      </div>
    </motion.div>

  )
}

export default CountriesList;