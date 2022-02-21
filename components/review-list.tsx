import { ReviewClientList } from '../types/reviews.types';
import styles from './review-list.module.css';
import Rating from './rating';

interface Props {
	reviews: ReviewClientList;
}

export default function ReviewList({ reviews }: Props) {
  return (
    <ul className={styles.reviews}>
      {reviews
        .sort((a, b) => b.timeStamp - a.timeStamp)
        .map((review) => {
          const dateTime = new Date(review.timeStamp * 1000);

          return (
            <li className={styles.review} key={review.id}>
              <span>Reviewer: </span>
              <span>{review.name}</span>
              <span>Reviewer rating: </span>
              <Rating rating={review.rating} />
              <span>Reviewer comment: </span>
              <span>{review.comment}</span>
              <span>Created: </span>
              <span>{review.timeStamp ? `${dateTime.toUTCString()}` : ''}</span>
            </li>
          );
        })}
    </ul>
  );
}
