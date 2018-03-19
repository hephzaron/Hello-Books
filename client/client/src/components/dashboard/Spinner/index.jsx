import React from 'react';

/**
 * @function Spinner
 * @description Renders the spinner component 
 * @param { null }
 * @returns { JSX }
 */

const Spinner = ()=> (
  <div className='loader col-md-6'>
    <div id='spinner' className='spinner'></div>
    <p>Loading...</p>
  </div>
);

export default Spinner;