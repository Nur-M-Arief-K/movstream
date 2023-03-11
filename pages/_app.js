/* import functions */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

/* import components */
import Loading from "@/components/loading/loading";

/* import fonts */
import { Roboto_Slab } from "next/font/google";

/* import styles */
import "@/styles/globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    handleLoggedIn();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className={robotoSlab.className}>
      <Component {...pageProps} />
    </div>
  );
}
