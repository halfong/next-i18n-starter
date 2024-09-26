import React from "react"
import T from "./t"
import TopnavLangSelector from "./topnav-lang-selector"

export default function Topnav({ lang='en' }){
  T.to = lang
  return (
    <nav>
      <div className="fix-t w-100" >
        <div className="container left py-20 flex-row bg-black-blur border-ink border-b">

          <div className="flex-1 flex-1 flex-m-1 h-54 left">

            <a className="tapable mr-10" href={`/${lang}`}>
              <div className="inline wh-48 center bg-primary" style={{ borderRadius:'33%' }}>
                <span className='icon icon-ho black th-48' style={{ fontSize:'39px' }} />
              </div>
              <p className="inline t-3 bold primary ml-10 th-54">Holli</p>
            </a>

            <TopnavLangSelector lang={lang} />

          </div>

          <div className="right" style={{ paddingTop:'9px' }}>
            <a href="https://app.holli.cc"
              className="hide-mobile h-36 bg-gray round-full inline px-20 tapable ml-10">
              <T as='span' className="bold t-5 th-36 primary">Sign In</T>
            </a>
          </div>
        </div>

      </div>
      <div className="w-100" style={{ height:'94px' }}></div>
    </nav>
  )
}