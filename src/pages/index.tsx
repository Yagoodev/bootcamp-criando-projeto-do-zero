import { GetStaticProps } from 'next';

import Header from "../components/Header";
import PostPreview from '../components/PostPreview';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <PostPreview />
      <PostPreview />

      <span className={styles.load}>Carregar mais posts</span>
    </div>
  )
} 

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType("posts-id", {
    pageSize: 20
  });

  console.log(postsResponse);

  return {
    props: {

    }
  }
};