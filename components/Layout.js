import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "@/styles/utils.module.css"; 

const name = "Shin Code";
export const sitetitle = "Next.js blog";

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>First Post</title>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img src="/images/profile.png" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />   
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <img src="/images/profile.png" className={utilStyles.borderCircle} />   
                        <h2 className={utilStyles.headingLg}>{name}</h2>  
                    </>
                )}
            </header>
            <main>
                {children}
            </main>
            {!home && (
                <div className={styles.backToHome}>
                    <a href="/">← Back to home</a>
                </div>
            )}
        </div>
    );
}

export default Layout;