import { FormEventHandler, useState } from 'react';
import { ReviewSimple } from '../types/reviews.types';
import Rating from './rating';
import styles from './review-form.module.css';

interface Props {
  fetchReviews: () => void;
}

export default function ReviewForm({ fetchReviews }: Props) {
  const [rating, setRating] = useState<ReviewSimple['rating']>(1);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const target: any = event.target;

    const data: ReviewSimple = {
      name: target.name.value,
      email: target.email.value,
      comment: target.comment.value,
      rating,
    };

    const JSONdata = JSON.stringify(data);

    try {
      const response = await fetch('/api/form', {
        body: JSONdata,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      await response.json();

      fetchReviews();
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className={styles['review-form']}
    >
      <label>
        <span>Name: </span>
        <input type="text" name="name" />
      </label>
      <label>
        <span>Email: </span>
        <input type="email" name="email" />
      </label>
      <label>
        <span>Rating: </span>
        <Rating rating={rating} interactive={true} setRating={setRating} />
      </label>
      <label htmlFor="comment">Comment:</label>
      <textarea
        id="comment"
        name="comment"
        rows={5}
        className={styles.comment}
      />
      <button type="submit">Submit review</button>
    </form>
  );
}
