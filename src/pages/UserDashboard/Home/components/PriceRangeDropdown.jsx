import React, {useState, useEffect, useContext} from 'react';

// import react icons
import { RiWallet3Line} from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
//import headless ui
import {Menu} from "@headlessui/react"; 
//import house context
import {HouseContext} from "../../../../context/index";


const PriceRangeDropdown = () => {

  const {price, setPrice} = 
  useContext(HouseContext);
  
  const [isOpen, setIsOpen] = useState(false);
  
  const prices = [
      {
      value: 'Price range (any)',
    },
    {
      value: '110000 - 130000',
    },
    {
      value: '130000 - 160000',
    },
    {
      value: '160000 - 190000',
    },
    {
      value: '190000 - 220000',
    },
    {
      value: '220000-250000',
    },
  ]

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button 
        onClick={() => setIsOpen(!isOpen)}
        className='dropdown-btn w-auto flex items-center justify-between text-left px-4 py-2 border rounded-lg'
      >
        <RiWallet3Line className='dropdown-icon-primary mr-2' />
        <div className='flex-grow'>
          <div className='text-[15px] font-medium leading-tight'>{price}</div>
          <div className='text-[13px]'>Select Price</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary ml-2' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary ml-2' />
        )}
      </Menu.Button>
      
      <Menu.Items className='dropdown-menu'>
        {prices.map((price, index) => (
          <Menu.Item
            onClick={() => setPrice(price.value)}
            className="cursor-pointer hover:text-green-700 transition"
            as="li"
            key={index}>
            {price.value}
      </Menu.Item>
  ))}
</Menu.Items>
      
    </Menu>
  );
};

export default PriceRangeDropdown;