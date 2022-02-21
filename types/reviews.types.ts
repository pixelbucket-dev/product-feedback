export interface Review {
	id: string;
	timeStamp: number;
	name: string;
	email: "string";
	comment?: string;
	rating: 1 | 2 | 3 | 4 | 5;
}

export type ReviewSimple = Omit<Review, 'id' | 'timeStamp'>;
export type ReviewClient = Omit<Review, 'email'>;

export type ReviewDict = Record<string, Review>;
export type ReviewClientList = ReviewClient[]