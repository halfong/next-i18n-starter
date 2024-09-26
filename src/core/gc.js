import { config } from 'dotenv';
config()

/**
 * Google Cloud services
 * - support languages: https://cloud.google.com/translate/docs/languages?hl=zh-cn
 * - price: https://cloud.google.com/translate/pricing?hl=zh-cn
 */
const key = process.env.GOOGLE_API_KEY

const $gc = {

  async test( text = 'hello', to='bn' ){
    return await $gc.translate( text, to )
  },

  /**
   * @returns 
   * @warning max word length 255
   */
  async translate( text, to ){
    // const res = await $client.translate(text, to)
    const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`,{
      cache: 'force-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        q: text,
        target: to,
        format: 'text'
      })
    }).then( res => {
      console.log('[fetch res]',res.headers.get('date') )
      return res.json()
    })
    if( res.error ){ console.log( text, res ); return text }
    else{
      // translations: [{"translatedText":"你好","detectedSourceLanguage":"en"}]
      return res.data?.translations[0].translatedText
    }
  }
}

export default $gc