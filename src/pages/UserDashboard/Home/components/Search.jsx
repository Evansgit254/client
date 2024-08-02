import React, { useContext } from 'react';
//import { Risearch2Line } from 'react-icons/ri';
import { CiSearch } from "react-icons/ci";



import CountryDropdown from './CountryDropdown';
import PropertyDropdown from './PropertyDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';

// import context
//import {HouseContext} from './HouseContext';

const Search = () => {
  //const {handleClick} = useContext(HouseContext)
  
  return (
    <div className='w-max h-[7rem] lg:w-3/4 p-6 max-auto flex flex-col 
    lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:top-[-7rem]
     bg-white mx-auto'>
      <CountryDropdown />
      <PropertyDropdown />
      <PriceRangeDropdown />
      <button className='bg-green-700
        hover:bg-green-800 transition w-full 1g: max-w-
        [162px] h-16 rounded-lg flex justify-center
        items-center text-black text-lg'>
        <CiSearch />
      </button>
    </div>
  );
};

export default Search;
