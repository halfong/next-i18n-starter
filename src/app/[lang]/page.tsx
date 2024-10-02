import { getLang, lang_site } from '@/core/i18n'
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
  const lang = getLang(params.lang)
  T.to = params.lang

  return (
    <main className='page index container'>
      <header className="center">
        <Ani type="fadeup">
          <T as='h1' className="pt-100 bold" style={{ fontSize:'54px', lineHeight:'70px' }}>{`Landing Page in ${ lang?.name }`}</T>
        </Ani>
      </header>
      <section className='mt-50'>
        <h2 className='t-2 bold mb-10'>Blogs</h2>
        { blog.map( _b =>
          <a className='block tapable p-20 round border-gray' href={`${lang?.code}/blog/${_b.slug}`}>
            <p className='t-3'>{ _b.title }</p>
          </a>
        )}
      </section>
    </main>
  );
}