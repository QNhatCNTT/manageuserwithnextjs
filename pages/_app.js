import "../styles/globals.css";
import "rsuite/dist/rsuite.min.css";
import Head from "next/head";
import { GlobalProvider } from "../context/GlobalState";
function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Head>
        <title>Manage User</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </GlobalProvider>
  );
}

export default MyApp;
