import { useState, useEffect } from "react";
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// SCSS
import './globals.scss'

// Components
import Home from "./Pages/Home";
import CountriesList from "./Pages/CountriesList"
import Loading from "./Components/Loading";
import Quiz from "./Pages/Quiz";
import CountryInformations from "./Pages/CountryInformations";
import Info from "./Pages/Info";


const App = () => {

  // Full country array Fetched
  const [countries, setCountries] = useState([])

  // Sorted and Displayed Array
  const [sortedArray,setSortedArray] = useState([])


  // True if countries array length is 250
  const [isLoaded,setIsLoaded] = useState(false)

  // Only Independent States
  const [onlyIndependent,setOnlyIndependent] = useState(true)   

  // Region Sort
  const [region,setRegion] = useState('all');

  // Sorting Method

  const [sortingMethod,setSortingMethod] = useState('nameAscending');

  // Search

  const [searchValue,setSearchValue] = useState('')


  const getCountries = async () => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/all`)
      const data = await res.data
      setCountries(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    getCountries()
  },[])

  useEffect(()=>{
    if(countries.length == 250){
      setIsLoaded(true)
      sorting()
    }
  },[countries])


  const sorting = ()=>{

    if(onlyIndependent){
      setSortedArray([...countries].filter(c => c.independent))
    }else{
      setSortedArray([...countries])
    }
    if(region != 'all'){
      setSortedArray(prev=>prev.filter(c=> c.region == region))
    }
    switch(sortingMethod){
      case 'nameAscending':
        setSortedArray(prev=>[...prev].sort((a,b)=>a.name.common.localeCompare(b.name.common)))
        break;
      case 'nameDescending':
        setSortedArray(prev=>[...prev].sort((a,b)=>b.name.common.localeCompare(a.name.common)))
        break;
      case 'areaAscending':
        setSortedArray(prev=>[...prev].sort((a,b)=> a.area - b.area))
        break;
      case 'areaDescending':
        setSortedArray(prev=>[...prev].sort((a,b)=> b.area - a.area))
        break;
    }
    if(searchValue){
      setSortedArray(prev=>prev.filter(c=> new RegExp(`${searchValue}`, 'i').test(c.name.common.toLowerCase())))
    }
  }

  // Only Independent
  useEffect(()=>{
      sorting()
  },[onlyIndependent,region,searchValue,sortingMethod])

  // Is returned to Home
  const [isReturnedHome,setIsReturnedHome] = useState(true)

  if(isLoaded){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home isReturnedHome={isReturnedHome} setIsReturnedHome={setIsReturnedHome} countries={countries}/>}/>
          <Route path="/countries" element={<CountriesList isReturnedHome={isReturnedHome} setIsReturnedHome={setIsReturnedHome} countries={sortedArray} setOnlyIndependent={setOnlyIndependent} onlyIndependent={onlyIndependent} region={region} setRegion={setRegion} searchValue={searchValue} setSearchValue={setSearchValue} sortingMethod={sortingMethod} setSortingMethod={setSortingMethod}/>}/>
          <Route path="/quiz" element={<Quiz countries={countries}/>}></Route>
          <Route path='/countries/:countryName' element={<CountryInformations countries={countries}/>}></Route>
          <Route path="/info" element={<Info></Info>}></Route>
        </Routes>
      </Router>
    )
  }else{
    return(
      <Loading/>
    )
  }
    
  

}

export default App;