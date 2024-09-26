import { lang_site, trans } from "./i18n"

const SITE = {
  url : "https://holli.cc" ,
  imgUrl : 'https://holli.cc/open-graph.webp',
}

/**
 * @param alternate langCode => absPath like '/en/xxx-xxx-xxxx'
 */
const make = async ( meta:{ title:string, keywords:string, description: string }, lang='en', alternate: Function|undefined ) => {

  const title = await trans( meta.title, lang )
  const description = await trans( meta.description, lang )
  const keywords = await trans( meta.keywords, lang )
  const category = await trans( 'education,tool', lang )

  var alternates
  if( alternate ){
    alternates = {
      languages : {},
      canonical: alternate('en'),
    }
    lang_site.forEach( _l => alternates.languages[_l.code] = alternate(_l.code) )
  }

  return Object.assign( meta, {
    title, description, keywords, category,
    alternates,

    metadataBase: 'https://holli.cc',
    author:'Hal.fong',
    appLinks: { web: { url: SITE.url, should_fallback: true, }, },

    openGraph: {
      title, description,
      url: SITE.url,
      siteName: title,
      images: [{ url: SITE.imgUrl, width: 1200, height: 630, },],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title, description,
      creator: '@halfong',
      images: [ SITE.imgUrl ],
    },
  })
}

const $metadata = { make }

export default $metadata