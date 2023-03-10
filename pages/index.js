/* import components */
import Head from "next/head";

import Banner from "@/components/banner/banner";
import Navbar from "@/components/navbar/navbar";
import SectionCards from "@/components/card/section-cards/section-cards";
import Card from "@/components/card/card";

/* import styles */
import styles from "../styles/Home.module.css";

export default function Home() {
  // sample videos data
  const disneyVideos = [
    {
      imgUrl: "/static/spiderman-far-from-home-poster-landscape.webp",
    },
    {
      imgUrl: "/static/spiderman-far-from-home-poster-landscape.webp",
    },
    {
      imgUrl: "/static/spiderman-far-from-home-poster-landscape.webp",
    },
  ];

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

      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Disney" videos={disneyVideos} size="medium" />
      </div>
    </>
  );
}
