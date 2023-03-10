import { Roboto_Slab } from "next/font/google";

import "@/styles/globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={robotoSlab.className}>
      <Component {...pageProps} />
    </div>
  );
};
