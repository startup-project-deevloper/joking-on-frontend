import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          
          <Main />
          <NextScript />
          <style jsx global>{`
            html {
              scroll-snap-type: y mandatory;
            }
          `}</style>
          <script
            type="text/javascript"
            src="//cdn.addpipe.com/2.0/pipe.js"
            defer
          ></script>
        </body>
      </Html>
    );
  }
}
