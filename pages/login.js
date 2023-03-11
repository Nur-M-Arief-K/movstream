/* import functions */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic-client";

/* import component */
import Head from "next/head";
import Link from "next/link";

/* import styles */
import styles from "../styles/Login.module.css";

const Login = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email) {
      if (email === "ariefnur141@gmail.com") {
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log({ didToken });
          if (didToken) {
            router.push("/");
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Something went wrong logging in", error);
          if (err instanceof RPCError) {
            switch (err.code) {
              case RPCErrorCode.MagicLinkFailedVerification:
                alert("Magic link verification failed, please login again");
                break;
              case RPCErrorCode.MagicLinkExpired:
                alert("Magic link has been expired, please login again");
                break;
              case RPCErrorCode.UserAlreadyLoggedIn:
                alert("This email has been login");
                break;
              default:
                alert("Something went wrong logging in", error);
            }
          }
        }
      } else {
        setIsLoading(false);
        console.log("Something went wrong logging in");
      }
    } else {
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Movstream Login</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>MOVSTREAM</div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Login</h1>

          <input
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
            required
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
