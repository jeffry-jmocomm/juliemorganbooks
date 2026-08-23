import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col pt-[72px]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* MailerLite Universal — powers BookFunnel popup & forms */}
      <Script id="mailerlite-universal" strategy="afterInteractive">
        {`
          (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
          var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
          f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
          var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
          _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

          var ml_account = ml('accounts', '715527', 'a7t4r9e7x4', 'load');
        `}
      </Script>
    </div>
  );
}
