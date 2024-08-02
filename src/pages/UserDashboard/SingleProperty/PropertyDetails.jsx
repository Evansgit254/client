import React from 'react';
// import data
import { housesData } from '../../../constants/data';
// import use params
import { useParams } from 'react-router-dom';
// import icons
import { BiBed, BiBath, BiArea } from 'react-icons/bi';


import {Link} from 'react-router-dom';



const PropertyDetails = () => {
  const {id} =useParams();

const house = housesData.find((house) => {
  return house.id === parseInt(id);
  });

console.log(house);

return (
  <section>
    <div className="container mx-auto min-h-[800px] mb-14">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{house.name}</h2>
          <h3 className="text-lg mb-4">{house.address}</h3>
        </div>
        <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
          <div className="bg-green-500 text-white px-3 rounded-full">{house.type}</div>
          <div className="bg-violet-500 text-white px-3 rounded-full">{house.country}</div>
        </div>
        <div className="text-3xl font-semibold text-violet-600">ksh.{house.price}</div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8 items-start">
        <div className="max-w-[768px] w-full lg:w-2/3 mb-8 lg:mb-0">
          <img src={house.imageLg} alt="House" className="w-full h-auto rounded-lg" />
          <div className="flex gap-x-6 text-violet-700 my-6">
            <div className="flex gap-x-2 items-center">
              <BiBed className="text-2xl" />
              <div>{house.bedrooms}</div>
            </div>
            <div className="flex gap-x-2 items-center">
              <BiBath className="text-2xl" />
              <div>{house.bathrooms}</div>
            </div>
            <div className="flex gap-x-2 items-center">
              <BiArea className="text-2xl" />
              <div>{house.surface}</div>
            </div>
          </div>
          <div>{house.description}</div>
        </div>

        <div className="flex-1 bg-white w-full lg:w-1/3 border border-gray-300 rounded-lg px-6 py-8">
          <div className="flex items-center gap-x-6 mb-6">
            <img src={house.agent.image} alt="Agent" className="rounded-full w-24 h-24" />
            <div>
              <div className="font-bold text-lg">Agent: {house.agent.name}</div>
              <Link to="" className="text-violet-700 text-sm">View Listings</Link>
            </div>
          </div>
          <form>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Name*" 
                className="w-full border border-gray-300 rounded px-4 py-2" 
              />
            </div>
            <div className="mb-4">
              <input 
                type="email" 
                placeholder="Email*" 
                className="w-full border border-gray-300 rounded px-4 py-2" 
              />
            </div>
            <div className="mb-4">
              <input 
                type="tel" 
                placeholder="Phone*" 
                className="w-full border border-gray-300 rounded px-4 py-2" 
              />
            </div>
            <div className="mb-4">
              <textarea 
                placeholder={`Hello, I am interested in [${house.name}]`} 
                className="w-full border border-gray-300 rounded px-4 py-2 h-32" 
              />
            </div>
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="bg-violet-700 text-white px-6 py-2 rounded"
              >
                Send message
              </button>
              <button 
                type="button" 
                className="bg-gray-300 text-black px-6 py-2 rounded"
              >
                Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
);
};

export default PropertyDetails;