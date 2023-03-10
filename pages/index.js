/* import functions */
import { getVideos } from "@/lib/videos";

/* import components */
import Head from "next/head";

import Banner from "@/components/banner/banner";
import Navbar from "@/components/navbar/navbar";
import SectionCards from "@/components/card/section-cards/section-cards";

/* import styles */
import styles from "../styles/Home.module.css";

/* SSR */
export async function getServerSideProps(context) {
  const disneyVideos = getVideos();

  return {
    props: { disneyVideos }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const { disneyVideos } = props;
  
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
