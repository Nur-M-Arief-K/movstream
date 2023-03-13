/* import functions */
import { useState } from "react";
import { useRouter } from "next/router";
import clsx from "classnames";
import { getYoutubeVideoById } from "@/lib/videos";

/* import components */
import Modal from "react-modal";
import Navbar from "@/components/navbar/navbar";
import Like from "@/components/icons/like-icon";
import DisLike from "@/components/icons/dislike-icon";

/* import styles */
import styles from "../../styles/Video.module.css";

Modal.setAppElement("#__next");

/* ISR */
export async function getStaticProps(context) {
  /* check route params */
  const videoId = context.params.videoId;

  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: { video: videoArray.length > 0 ? videoArray[0] : {} },
    revalidate: 10,
  };
}

/* store known static paths */
export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = (props) => {
  const router = useRouter();

  const { video } = props;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);
  
  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  const handleToggleDislike = async () => {
    console.log("handleToggleDislike");
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);
  };

  const handleToggleLike = async () => {
    console.log("handleToggleLike");
    setToggleLike(!toggleLike);
    setToggleDisLike(toggleLike);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        {
          // embed youtube video
          <iframe
            className={styles.videoPlayer}
            id="ytplayer"
            type="text/html"
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
            frameBorder="0"
          ></iframe>
        }

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDisLike} />
            </div>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
