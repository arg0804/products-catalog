import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/loader.css'

const Loader = () => (
  <div className='loader'>
    <ClipLoader size={50} />
  </div>
);

export default Loader;