/* import functions */
import { redirectUser } from "@/utils/redirectUser";
import { getMyList } from "@/lib/videos";

/* import components */
import Head from "next/head";

import Navbar from "@/components/navbar/navbar";
import SectionCards from "@/components/card/section-cards/section-cards";

/* import styles */
import styles from "../../styles/MyList.module.css";

/* SSR */
export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);
  
  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = (props) => {
  const { myListVideos } = props;

  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
