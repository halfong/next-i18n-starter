import Topnav from "@/components/topnav";
import Footer from "@/components/footer";
import "@/assets/app.scss";
import { lang_site } from "@/core/i18n";

export async function generateStaticParams() {
  return lang_site.map( lang => ({ lang: lang.code }) )
}

export const viewport = { themeColor: "#111315" }

export default function LayoutLang({ children, params }){
  return (
    <html lang={ params.lang }>
      <body>
        <Topnav lang={ params.lang } />
        { children }
        <Footer lang={ params.lang }/>
      </body>
    </html>
  );
}