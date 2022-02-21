import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReviewForm from '../components/review-form';
import styles from '../styles/Home.module.css';
import { ReviewClientList } from '../types/reviews.types';
import RatingCountChart from '../components/rating-count-chart';
import ReviewList from '../components/review-list';

const Home: NextPage = () => {
  const [productReviews, setProductReviews] = useState<ReviewClientList>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('api/reviews');
      const newProductReviews = await response.json();

      setProductReviews(newProductReviews);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Product review</title>
        <meta
          name="description"
          content="Add a n review and see reviews for the selected product"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Reviews for product</h1>
      </header>

      <main className={styles.main}>
        <ReviewForm fetchReviews={() => fetchReviews()}></ReviewForm>

        <RatingCountChart reviews={productReviews} />

        <ReviewList reviews={productReviews} />
      </main>
    </div>
  );
};

export default Home;
