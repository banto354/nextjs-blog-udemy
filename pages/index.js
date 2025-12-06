import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout, { sitetitle } from "@/components/Layout";
import utilStyles from "@/styles/utils.module.css";
import {getPostsData} from "@/lib/post";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console .log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}
 
export default function Home({ allPostsData }) {
  return (
  <Layout home>
    <Head>
      <title>{sitetitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>
        私は何のサイトを作っているのか。
      </p>
    </section>
    <section>
      <h2 >📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>     
            <Link href={`posts/${id}`}>
              <img 
              src={`${thumbnail}`}
              className={styles.thumbnailImage}  />
            </Link>
            <Link href={`posts/${id}`} className={utilStyles.boldText}>
              {title}
            </Link>
            <br />
            <small className={utilStyles.lightText}>{date}</small>
          </article>
        ))}
      </div>
    </section>
  </Layout>
  );
}
