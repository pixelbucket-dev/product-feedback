import { NextApiRequest, NextApiResponse } from "next"
import { addReview } from "./store"

export default function handler(req: NextApiRequest,
	res: NextApiResponse<any>) {
	// Get data submitted in request's body.
	const body = req.body

	// Optional logging to see the responses
	// in the command line where next.js app is running.
	console.log('body: ', body)

	// Guard clause checks for first and last name,
	// and returns early if they are not found
	if (!body.name || !body.email || !body.comment) {
		// Sends a HTTP bad request error code
		return res.status(400).json({ data: 'Missing input' })
	}

	addReview({ name: body.name, comment: body.comment, email: body.email, rating: body.rating })

	// Found the name.
	// Sends a HTTP success code
	res.status(200).json({ data: `${body.name} ${body.email} ${body.comment}` })
}
