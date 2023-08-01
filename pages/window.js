import { useState, useEffect } from 'react';
export default function Window() {
  const [value, setValue] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem('value');
      if (value) {
        setValue(value + ' from server');
      }
    }
  }, []);


  return (
    <div className='text-2xl text-black flex justify-center items-center h-screen'>
      <button className='bg-black text-white px-4 py-2 rounded-sm' onClick={() => {
        window.localStorage.setItem('value', 'value from client');
      }}>
        Action
      </button>
      {value}
    </div>
  )
}