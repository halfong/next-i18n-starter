import { lang_site } from "@/core/i18n";
import AutoLangRedirect from "./client/AutoLangRedirect";

export default function TopnavLangSelector({ lang='en' }){
  return (
    <div className="hover-box inline h-54">
      <span className="icon icon-earth th-54 white"/>
      <span className="th-54 white t-6 ml-2">{ lang_site.find(_l => _l.code === lang)?.nativeName  }</span>
      <span className="icon icon-down th-54 gray t-6 ml-2"/>

      <div className="hover-show ab-tl bg-black border-ink round p-15" style={{ width:'320px', top:'44px' }}>
        { lang_site.map( _l =>
          <a key={_l.code} className="inline px-5 t-6 th-36 hover-bg-lighten round" href={`#setLang=${_l.code}`}>{ _l.nativeName }</a>
        )}
      </div>
      <AutoLangRedirect lang={ lang } />
    </div>
  )
}