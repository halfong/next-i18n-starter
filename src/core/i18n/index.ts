import $gc from '../gc'
import $cache from './cache'
import { lang_native, lang_site } from './langs'

type Lang = { name:string, nativeName:string, dir:string, translations: string[], code:string }

/**
 * Auto Implemented File Cache, see: $cache
 */
async function trans( text, to, from='en' ):Promise<string>
{
  if( to === from ) return text

  const existed = await $cache.read( to, { text, to } )
  if( existed ) return existed.result

  return await $gc.translate( text, to ).then(
    async _t => {
      await $cache.write(to, { text, to }, { text, from, to, result: _t })
      return _t
    },
    e => { console.log( e ); return '❌'}
  )
}

function getLang(code):Lang|undefined
{
  return lang_native.find( l => l.code === code ) || lang_native.find( l => l.code.split('-').shift() === code.split('-').shift() )
}

export { lang_site, trans, getLang }