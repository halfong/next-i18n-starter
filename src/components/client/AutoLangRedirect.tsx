"use client"
import { useEffect } from "react"

export default function AutoLangRedirect({ lang = 'en' }){

  useEffect(()=>{
    const cb = e => {
      console.log('Hash changed:', window.location.hash );
      const [action,val] = window.location.hash.slice(1).split('=')
      if( action==='setLang' ){
        localStorage.setItem('lang', val)
        const to = window.location.pathname.replace(/\/[\w-]*/,`/${val}`)
        window.location.replace( to )
      }
    }
    window.addEventListener('hashchange',cb)
    console.log(window.location.pathname)
    if( window.location.pathname === '/' || window.location.pathname === '/en' ){
      const _last = localStorage.getItem('lang')
      // @fix do it properly
      // if( _last && _last !== lang ) window.location.replace(`/${_last}`)
    }
    return () => window.removeEventListener('hashchange',cb)
  },[lang])
  
  return <></>
}