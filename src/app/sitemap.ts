import { lang_site } from '@/core/i18n'
import type { MetadataRoute } from 'next'

import { generateStaticParams as genContentPages } from './[lang]/[type]/[slug]/page'

type PageInfo = { path: string, priority: number, changeFrequency?: "weekly" | "yearly" | "always" | "hourly" | "daily" | "monthly" | "never" | undefined, mutilingo?: Function }

const root = 'https://holli.cc'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const basePages:PageInfo[] = [
    { path: '/', mutilingo: _c => `/${_c}`, priority: 1,  changeFrequency: 'monthly', },
  ]

  const contentPages:PageInfo[] = ( await genContentPages() ).filter( _p => _p.lang === 'en' )
    .map( _p => ({
      path: `/${_p.lang}/${_p.type}/${_p.slug}`,
      priority: 0.8,
      mutilingo: _c => `/${_c}/${_p.type}/${_p.slug}`,
    }) )

  return [ ...basePages, ...contentPages, ].map( _p => ({
    url: root + _p.path,
    priority: _p.priority,
    changeFrequency: _p.changeFrequency || 'yearly',
    alternates:
      _p.mutilingo && {
        languages: Object.fromEntries(
          lang_site.map(_l => [ _l.code, root + ( _p.mutilingo && _p.mutilingo( _l.code ) ) ] )
        )
      },
  }))
}