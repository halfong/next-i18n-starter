"use client"
import React, { useEffect, useRef, useState } from "react"

/**
 * Will add class 'visible' at show
 * @oaram {false|Number} onscreen offset means how many px entered viewport (default 1/3 window.height )
 */
export default function Ani({
  type='fadeup', show=true, delay = 10, onscreen = false, duration=300,
  children, className='', style={} }){

  const [visible,setVisible] = useState(false)
  const ref = useRef()

  useEffect( ()=>{
    if( onscreen && !visible ){
      const _s = e => {
        if( window.scrollY + window.innerHeight > ref.current.offsetTop + ( Number.isInteger(onscreen) ? onscreen : window.innerHeight/5 ) ){
          setTimeout( () => setVisible( show ), delay )    
        }
      }
      _s()
      window.addEventListener( 'scroll', _s )
      return () => window.removeEventListener('scroll',_s)
    }else{
      const timer = setTimeout( () => setVisible( show ), delay )
      return () => clearTimeout( timer )
    }
  }, [show, visible, delay, onscreen] )

  return (
    <div ref={ ref } className={ className + ' ' + ( visible ? 'visible' : '' ) + ` ani-${type}` } style={ { ...style, transitionDuration:duration+'ms' } }>
      { children }
    </div>
  )
}