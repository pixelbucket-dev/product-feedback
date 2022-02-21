// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReviewClientList } from '../../types/reviews.types';
import { getReviews } from './store';

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse<ReviewClientList>
) {
	const reviews = await getReviews();

	const reviewsForClient = Object.values(reviews).map(review => {
		const { email, ...rest } = review;

		return rest
	})

	res.status(200).json(reviewsForClient)
}
