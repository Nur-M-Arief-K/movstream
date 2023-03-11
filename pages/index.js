/* import functions */
import { getVideos, getPopularVideos } from "@/lib/videos";

/* import components */
import Head from "next/head";

import Banner from "@/components/banner/banner";
import Navbar from "@/components/navbar/navbar";
import SectionCards from "@/components/card/section-cards/section-cards";

/* import styles */
import styles from "../styles/Home.module.css";

/* SSR */
export async function getServerSideProps(context) {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();

  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const { disneyVideos, productivityVideos, travelVideos, popularVideos } =
    props;

  return (
    <>
      <Head>
        <title>Movstream</title>
      </Head>
      <div className={styles.main}>
        <Navbar/>
        <Banner
          title="Spiderman far from home"
          subTitle="The ultimate adventure of spider-verse"
          imgUrl="/static/spiderman-far-from-home-poster-landscape.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </>
  );
}
