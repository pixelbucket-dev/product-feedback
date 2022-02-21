import { ReviewSimple } from '../types/reviews.types';
import styles from './rating.module.css';

interface Props {
  rating: ReviewSimple['rating'];
  interactive?: boolean;
  setRating?: (rating: ReviewSimple['rating']) => void;
}

export default function Rating({ rating, setRating, interactive=false }: Props) {
  return (
    <div className={`${styles.rating} ${interactive ? styles.interactive : ''}`}>
      <label className={`${rating > 0 ? styles.checked : ''}`}>
        <input
          type="radio"
          name="rating"
          value={1}
          defaultChecked={rating === 1}
          onClick={() => setRating && setRating(1)}
		  
        />
      </label>
      <label className={`${rating > 1 ? styles.checked : ''}`}>
        <input
          type="radio"
          name="rating"
          value={2}
          defaultChecked={rating === 2}
          onClick={() => setRating && setRating(2)}
		  
        />
      </label>
      <label className={`${rating > 2 ? styles.checked : ''}`}>
        <input
          type="radio"
          name="rating"
          value={3}
          defaultChecked={rating === 3}
          onClick={() => setRating && setRating(3)}
		  
        />
      </label>
      <label className={`${rating > 3 ? styles.checked : ''}`}>
        <input
          type="radio"
          name="rating"
          value={4}
          defaultChecked={rating === 4}
          onClick={() => setRating && setRating(4)}
		  
        />
      </label>
      <label className={`${rating > 4 ? styles.checked : ''}`}>
        <input
          type="radio"
          name="rating"
          value={5}
          defaultChecked={rating === 5}
          onClick={() => setRating && setRating(5)}
		  
        />
      </label>
    </div>
  );
}
