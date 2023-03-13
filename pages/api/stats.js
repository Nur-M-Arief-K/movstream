/* import functions */
import jwt from "jsonwebtoken";
import { findVideoIdByUser, updateStats, insertStats } from "@/lib/db/hasura";

export default async function stats(req, resp) {
  if (req.method === "POST") {
    try {
      /* cookies are sent by default with every http request */
      const token = req.cookies.token;
      if (!token) {
        resp.status(403).send({});
      } else {
        const { videoId, favorited, watched = true } = req.body;
        if (videoId) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          const userId = decodedToken.issuer;
          const doesStatsExist = await findVideoIdByUser(
            token,
            userId,
            videoId
          );
          if (doesStatsExist) {
            // update it
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            });
            resp.send({ response });
          } else {
            // add it
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            });
            resp.send({ response });
          }
        }
      }
    } catch (error) {
      console.error("Error occurred /stats", error);
      resp.status(500).send({ done: false, error: error?.message });
    }
  }
}
