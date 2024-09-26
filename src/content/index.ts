// app/components/BlogList.server.tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type MDContent = {
  slug: string
  content: string
  [key: string]: any  // see matter()
}

const folder = type => path.join(process.cwd(), `src/content/${type}`)
const $content = {

  async get(type: string, slug: string, withContent: boolean = false): Promise<MDContent> {
    const fullPath = path.join(folder(type), slug + '.mdx')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return { slug, content, ...data }
  },

  async list( type, limit = 0 ):Promise<MDContent[]>
  {
    const fileNames = fs.readdirSync( folder(type) )

    const mds = ( await Promise.all(
      fileNames.map( fileName => $content.get( type, fileName.replace(/\.(.+?)$/,'') ) )
    ) ).sort((a, b)=> b.date - a.date )
    
    return limit ? mds.slice(0, limit) : mds
  },

}
export default $content