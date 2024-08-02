import React from "react";
// import icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";
const SingleAmenity = ({ title, icon }) => {
  return (
    <div className="flex items-center text-gray-500 gap-1 mb-4">
      <div className="text-sm ">{icon}</div>
      <p className="text-sm p-0 m-0">{title}</p>
    </div>
  );
};
export const House = ({ house }) => {
  const {
    image,
    type,
    country,
    address,
    bedrooms,
    bathrooms,
    surface,
    price,
    imageLg,
  } = house;

  return (
    <div className="bg-white w-full flex flex-col space-y-5 rounded-t-lg max-w-[352px] mx-auto cursor-pointer transition">
      <div className="w-full rounded-lg overflow-hidden">
        <img className="w-full h-full" src={imageLg} alt="" />
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 text-sm">
            <div className="bg-green-50 text-green-500 border-green-300 border rounded-full px-3">
              {type}
            </div>
            <div className="bg-violet-50 text-violet-500 border-violet-300 border rounded-full  px-3">
              {country}
            </div>
          </div>
          <p className="p-0 m-0 font-semibold text-sm text-violet-600">
            ksh.{price}
          </p>
        </div>
        <p className="text-sm">
          {address}
        </p>
      </div>
      <div className="flex gap-x-4 my-4">
        <SingleAmenity title={bedrooms} icon={<BiBed />} />
        <SingleAmenity title={bathrooms} icon={<BiBath />} />
        <SingleAmenity title={surface} icon={<BiArea />} />
      </div>
    </div>
  );
};

export default House;
