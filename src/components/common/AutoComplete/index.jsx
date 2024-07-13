import React, { useState } from 'react';


export default function Autocomplete({
   options,label,registerFunction,name,error
}) {
    return (
     <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium font-sans text-secondary'>{label}<span className='text-primary'>*</span></label>
        <select {...registerFunction(name)} className="w-full  p-2 border border-gray-300 rounded">
            {options.map((option,i)=><option key={i} className='bodyLarge p-2'>{option.name}</option>)}
       </select>
       {error ? <p className='text-red-600 body2'>{error}</p> : "" }
    </div>
       
    );
}
