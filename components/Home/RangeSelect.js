import { RadiusContext } from '@/context/RadiusContext';
import React, { useState,useContext } from 'react'



function RangeSelect({onRadiusChange}) {
    const {radius, setRadius} = useContext(RadiusContext);
    
  return (
    <div className='mt-5 px-2'>
        <h2
        className='font-bold '
        >Select Radius (In Km)</h2>
        <input type='range'
        className='w-full h-2 bg-gray-200
        rounded-lg appearance-none
        cursor-pointer '
        min="5"
        max="50"
        step="5"
        onChange={(e)=>{setRadius(e.target.value);onRadiusChange(e.target.value)}}
        defaultValue={radius}
        />
        <label className='text-gray-500
        text-[15px]'>{radius} in Km</label>
    </div>
  )
}

export default RangeSelect