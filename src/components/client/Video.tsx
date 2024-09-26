"use client"

import { useEffect, useState } from "react"

export default function Video({ title, src, cover, className='', style = {} }:{ title:string, src:string, cover:string, className?:string, style?:object })
{
  const [show,setShow] = useState(false)
  const [ vStyle, setVStyle ] = useState({ width:0, height:0 })

  useEffect(()=>{
    const _w = window.innerWidth
    setVStyle(window.innerHeight > window.innerWidth ? { width:_w, height:0.5625*_w} : { width:0.64*_w, height:0.36*_w})
  },[show])

  return (
    <div className={ className } style={ style }>
      <img className="inline tapable round" style={{ width:'100%'}} src={ cover } onClick={ () => setShow(true) } />
      { show &&
        <div className="fix-t w-100 h-100 flex-row" style={{ background:'#000c', alignItems:'center' }}>
          <div className="flex-1 center">
            <iframe className='inline round' width={ vStyle.width } height={ vStyle.height } style={{ width: vStyle.width+'px', height: vStyle.height+'px', zIndex:1000, border:'4px #fff1 solid', }} 
              title={ title } src={ src }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>
          </div>
          <div className="wh-48 round-full bg-primary ab-tr tapable" style={{ right:'3vw', top:'3vw' }} onClick={ () => setShow(false) }><span className="icon icon-close t-3 black th-48"/></div>
        </div>
      }
    </div>
  )
}