import storage from 'node-persist';
import crypto from 'crypto';

import { Review, ReviewDict } from '../../types/reviews.types';

async function init() {
	try {
		await storage.getItem('reviews');

		return;
	} catch (error) {
		await storage.init({
			dir: './database',
			stringify: JSON.stringify,
			parse: JSON.parse,
			encoding: 'utf8',
			logging: false,
			forgiveParseErrors: false,
		});

		const reviews: ReviewDict = await storage.getItem('reviews');

		if (reviews) {
			return;
		}

		await storage.setItem('reviews', {});

		return;
	}
}

export async function addReview(review: Omit<Review, 'id' | 'timeStamp'>) {
	const reviews: ReviewDict =
		(await storage.getItem('reviews')) || Promise.resolve({});

	const randomUUID = crypto.randomUUID();

	reviews[randomUUID] = {
		...review,
		id: randomUUID,
		timeStamp: new Date().getTime() / 1000,
	};

	await storage.setItem('reviews', reviews);
}

export async function getReviews(): Promise<ReviewDict> {
	await init();

	return storage.getItem('reviews');
}
