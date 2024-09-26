export default async function PageEmptyIndex(){
  return (
    <main className='page gate center py-100'>
      <p>As a muti-language site, set default language by:</p>
      <p>Setup your nginx to route <b>/</b> to <b>/[lang]</b></p>
    </main>
  );
}