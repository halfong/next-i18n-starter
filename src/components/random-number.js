// write a nexjs client component show a random number
import React from 'react';

const random = ()=>{
  const days = Math.round( ( new Date().getTime() - new Date('2024-08-01').getTime() ) / 1000 / 60/60/24 )
  return days * 3589
}

export default  function RandomNumber({ className='' }){
  return <span className={ className }>{ toString ? random().toLocaleString() : random() }</span>
}