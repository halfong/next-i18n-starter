require('dotenv').config();

const root = './src/core'

async function cmd(){
  const stime = new Date().getTime()
  const args = process.argv.slice(2)
  const [s,fn] = args.shift().split(':')
  
  try{
    const result = await require(`${root}/${s}`)[fn].apply( null, args.map( _a => !!Number(_a) ? Number(_a) : _a ) )
    console.log( JSON.stringify(result) )
  }catch(e){
    console.log(e)
  }
  console.log(`\n[耗时 ${ new Date().getTime() - stime }ms]`)
}

cmd();