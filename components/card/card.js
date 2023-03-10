/* import functions */
import { useState } from "react";
import cls from "classnames";
import { motion } from "framer-motion";

/* import components */
import Image from "next/image";

/* import stles */
import styles from "./card.module.css";

const Card = (props) => {
  const { imgUrl = "/static/default-thumbnail.webp", size = "medium" } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc("/static/default-thumbnail.webp");
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ scale: 1.2 }}
      >
        <Image
          priority
          src={imgSrc}
          onError={handleOnError}
          alt="image"
          fill
          className={styles.cardImg}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </motion.div>
    </div>
  );
};

export default Card;
