import { lang_target } from "@/core/i18n/langs";
import T from "./t";

export default function Footer({ lang='en' }){
  T.to = lang
  return (
    <div className="border-ink border-t py-50 mt-100" style={{ background:"#00000040" }}>
    <div className='container center'>
      <T as='h3' className="t-5 white center" style={{ fontWeight:'normal' }}>{
        '<span>Support Learning Languages:</span><br/>' +
        lang_target.map( _l => `<span class="px-5">${_l.name}</span>` ).join(' | ')
      }</T>
      <p className="mt-20 t-5 silver">
        <T as='a' className="silver tapable" href={`/${lang}/docs/privacy`}>Privacy Policy</T>
        <span className="silver"> / </span>
        <T as='a' className="silver tapable" href={`/${lang}/docs/terms`}>Terms of use</T>
      </p>
      <T as='p' className="t-5 silver">
        {'Made by <a class="t-5 primary" href="https://hal-f.cn" target="_blank" rel="noreferrer" >halfong</a>'}
      </T>
      { ( lang==='en' || lang==='zh-Hans' ) &&
        <a className="t-5 gray" target="_blank" href="https://beian.miit.gov.cn">鄂ICP备2020020359号-2</a>
      }
    </div>
    </div>
  )

}