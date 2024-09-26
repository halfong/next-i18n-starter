export default async function LayoutEmptyIndex({ children }){
  return (
    <html>
      <body>
        { children }
      </body>
    </html>
  );
}