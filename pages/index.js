/* import functions */
import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "@/lib/videos";

/* import components */
import Head from "next/head";

import Banner from "@/components/banner/banner";
import Navbar from "@/components/navbar/navbar";
import SectionCards from "@/components/card/section-cards/section-cards";

/* import styles */
import styles from "../styles/Home.module.css";

/* SSR */
export async function getServerSideProps(context) {
  const token = context.req ? context.req?.cookies.token : null;
  console.log({ token });
  const userId = "did:ethr:0x20B59705F027d977835dB952043eb4457f940E04";

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  console.log({ watchItAgainVideos });

  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
      watchItAgainVideos,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const {
    disneyVideos,
    productivityVideos,
    travelVideos,
    popularVideos,
    watchItAgainVideos,
  } = props;

  console.log(watchItAgainVideos);

  return (
    <>
      <Head>
        <title>Movstream</title>
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Spiderman far from home"
          subTitle="The ultimate adventure of spider-verse"
          imgUrl="/static/spiderman-far-from-home-poster-landscape.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
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
