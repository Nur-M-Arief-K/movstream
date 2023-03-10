/* import components */
import Head from "next/head";

import Banner from "@/components/banner/banner";

/* import styles */
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movstream</title>
      </Head>
      <h1>HI IM HOME PAGE</h1>
      <Banner
        title="Spiderman far from home"
        subTitle="The ultimate adventure of spider-verse"
        imgUrl="/static/spiderman-far-from-home-poster-landscape.webp"
      />
    </>
  );
}
