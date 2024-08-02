import React, { useContext } from "react";
import { HouseContext } from "../../../../context/HouseContext";

// import component
import { House } from "./House";

import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  // if loading is true
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center ">
        <ImSpinner2 className="mx-auto animate-spin text-black text-4xl mt-10" />
      </div>
    );
  }
  if (houses.length < 1) {
    return (
      <div className="text-center text-3xl text-gray-500 mt-48">
        Sorry, nothing found
      </div>
    );
  }

  return (
    <section className="h-max pb-24 ">
      <div className="container mx-auto">
        <div className=" grid md:-cols-2 lg:grid-cols-4 gap-4">
          {houses.map((house, index) => (
            <Link to={`/property/${house.id}`} key={index}>
              <House house={house} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HouseList;
