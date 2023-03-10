/* import components */
import Head from "next/head";

import Banner from "@/components/banner/banner";
import Navbar from "@/components/navbar/navbar";

/* import styles */
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movstream</title>
      </Head>
      <Navbar username="ariefnur141@gmail.com" />
      <Banner
        title="Spiderman far from home"
        subTitle="The ultimate adventure of spider-verse"
        imgUrl="/static/spiderman-far-from-home-poster-landscape.webp"
      />
    </>
  );
}
