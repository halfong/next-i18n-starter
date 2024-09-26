import React from "react"
import $content from "@/content"
import $metadata from "@/core/metadata"
import helper from "@/core/helper"
import { marked } from "marked"
import { lang_site } from "@/core/i18n"
import T from "@/components/t"

type StatisParams = { lang:string, type:string, slug:string }

const TYPES = ['blog']

export async function generateStaticParams() {
  const contents: StatisParams[] = []
  for(let _t of TYPES){
    const _cs = ( await $content.list(_t) ).map(_p => ({ type: _t, slug: _p.slug, }) )
    lang_site.forEach( _l => _cs.forEach( _c => contents.push({..._c, lang: _l.code}) ) )
  }
  return contents
}

export async function generateMetadata({ params }:{ params: StatisParams }){
  const content = await $content.get( params.type, params.slug, true )
  return await $metadata.make({
    title: content.title,
    keywords: content.keywords || 'HolliTube, Blog, Language Learning',
    // @next add summary description
    description: content.content.slice(0,250)+'...',
  }, params.lang, _code => `/${_code}/${params.type}/${params.slug}`)
}

export default async function ContentPage({ params }: { params: StatisParams }) {
  const { title, content, date } = await $content.get( params.type, params.slug, true )
  T.to = params.lang

  return <div className="flex-row container" style={{ gap:'20px' }}>
    { params.type === 'docs' && <aside className="flex-none pt-50"><ContentNav slug={params.slug} type={params.type} lang={ params.lang } /></aside> }
    <main className="flex-1 center">
      <article style={{ maxWidth:'720px', margin:'0 auto' }}>
        <header className="center pt-50 pb-100">
          <T as='h1' className="t-1 bold">{ title }</T>
          <p className="silver t-5 bold mt-10"><time className="silver">{ helper.formatDate( date, 'MM/DD YYYY' ) }</time></p>
        </header>
        <T as='main' className="markdown left">{ marked.parse( content ).toString() }</T>
      </article>
    </main>
  </div>
}

const ContentNav = async function({ type, slug, lang = 'en' }){
  const list = await $content.list(type)
  T.to = lang
  return (
    <nav className="pr-10" style={{ minWidth:'240px', borderRight:'1px #fff2 solid', }}>
      <ul className="left">{
        list.map( ( doc, i ) => (
          <li key={i}>
            <a className={`block t-5 tapable px-10 py-5 round ${ doc.slug === slug ? 'bg-gray primary' : '' }`} href={`/${lang}/docs/${doc.slug}`}>
              <T as='span'>{ doc.title }</T>
            </a>
          </li>
        ) )
      }</ul>
    </nav>
  )
}