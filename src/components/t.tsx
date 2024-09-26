import { trans } from "@/core/i18n"
import React from "react"

const T = async function T({ as: TagName, className='', style={}, children, ...attrs }){
  const __html = await trans( children, T.to, T.from )
  return <TagName className={ className } style={ style } dangerouslySetInnerHTML={{ __html }} { ...attrs }></TagName>
}
T.from = 'en'
T.to = 'zh-Hans'

export default T