import { lang_site } from '@/core/i18n'
import Ani from "@/components/ani";
import IconChrome from "@/components/icon-chrome";
import T from '@/components/t';
import $metadata from '@/core/metadata';
import $content from '@/content';
import helper from '@/core/helper';

export async function generateStaticParams() {
  return lang_site.map( lang => ({ lang: lang.code }) )
}

export async function generateMetadata({ params }:{ params: {lang:string} }){
  const meta = await $metadata.make({
    title : 'Holli -- AI Language Learning Toolkit 2024',
    description : "Holli Tube: Your personal AI-powered language learning gym! Empowers YouTube subtitles via Chrome extension. Enhance your skills with our toolkit.",
    keywords : 'HolliTube, YouTube, Subtitles, LanguageLearning, AI-Tool, Extension',
  }, params.lang, code => `/${code}` )
  if( params.lang==='en' || params.lang==='zh-Hans' ) meta.title += '-- Holli的官方网站'
  return meta
}

export default async function LandingPage({ params }: { params: { lang:string } }){

  const blog = await $content.list('blog',5)
  T.to = params.lang

  return (
    <main className='page gate center' style={{ background:'url("/bg.webp") no-repeat', backgroundSize: 'contain', backgroundPosition:'center top' }}>

      {/* Hero */}
      <header className="container">

        <Ani type="fadeup">
          <T as='h1' className="pt-100 bold" style={{ fontSize:'54px', lineHeight:'70px' }}>{
            'Rapid <span class="primary border-primary border-b">muti-language</span> <br/> NextJS site template'
          }</T>
        </Ani>

        <div className='mt-50'>   
          <Ani className="hide-desktop h-54 round-full inline px-20 border-silver">
            <T as='p' className="t-6 th-54 bold silver">{'Visit on <span class="blue">Desktop</span> to get started'}</T>
          </Ani>
          <Ani type="popin" className="hide-mobile" delay={300}>
            <a href="https://app.holli.cc"
              className="h-54 bg-primary round-full inline px-20 tapable" style={{ minWidth:'200px' }}>
              <span className="icon icon-play th-54 t-2 black mr-5"/>
              <T as='span' className="bold t-5 th-54 black pr-10">Enter Gym</T>
            </a>
          </Ani>
          <Ani type="popin" className="hide-mobile mt-10" delay={500}>
            <a href="https://chromewebstore.google.com/detail/holli-tube/pinidfapmihbmkkieckicbjdpnohnmch"
              target="_blank"
              className="h-54 border-gray round-full inline px-20 tapable" style={{ minWidth:'200px' }}>
              <span className="pt-15 inline mr-10"><IconChrome width={24} height={24} /></span>
              <T as='span' className="t-5 th-54 white">Get Extension</T>
            </a>
          </Ani>
        </div>

      </header>

      {/* Blogs */}
      <Ani onscreen duration={800} className="container my-50 center">
        <T as='h2' className="t-2 bold mb-30">Blogs</T>
        <div className="flex-row" style={{ gap:'10px', flexWrap:'wrap', }}>
          { blog.map( _p =>
            <a key={_p.title} href={`${params.lang}/posts/${_p.slug}`}
              className="flex-1 py-20 px-10 mt-20 border-ink border-b left tapable"
              style={{ flexBasis:"100%" }}>
              <T as='h3' className="t-3">{ _p.title }</T>
              <p className="right"><T as='time' className="silver">{ helper.formatDate(_p.date,'YYYY-MM-DD') }</T></p>
            </a>
          )}
        </div>
      </Ani>
    </main>
  );
}