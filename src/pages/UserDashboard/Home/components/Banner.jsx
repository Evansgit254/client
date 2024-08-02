import React from 'react';
// Import image
import Image from '../../../../assets/img/house-banner.jpg';
// Import components
import Search from './Search';

const Banner = () => {
  return (
    <section className='relative' style={{ height: 'calc(100vh - 4rem)', width: '100%'}}>
      <div className='absolute inset-0 h-full w-full overflow-hidden'>
        <img className='w-full h-full object-cover object-center' src={Image} alt='' />
      </div>
      <div className='relative z-10 flex h-full w-full items-center justify-center text-white'>
        <div className='flex flex-col items-center text-center' style={{ marginTop: '80px' }}>
          <h1 className='text-4xl lg:text-[58px]'>
            Rent A House <span className='block mt-6'>With Us</span>
          </h1>
          <p className='max-w-[480px] mb-8 mt-6'></p>
        </div>
      </div>
      <Search />
    </section>
  );
};

export default Banner;