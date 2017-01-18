const db = require('APP/db');

const reviews =
[
 {
  content: 'Fantastic broom. I seek, I score.',
  rating: 5,
	product: 'Firebolt',
	user: 'Harry Potter'
 },
 {
  content: 'I wish I had one. Perhaps my father can buy me one.',
  rating: 4,
	product: 'Firebolt',
	user: 'Draco Malfoy'
 }
]

const seedReviews = () => {
	let product, user;
	return db.Promise.map(reviews, (review, index) => {
		return db.model('products').find({
				where: {
					name: review.product
				}
		})
		.then (found => {
			product = found;
			return db.model('users').find({
				where: {
					name: review.user
				}
			})
		})
		.then (found => {
			user = found;
			return db.model('reviews').create ({
				content: review.content,
				rating: review.rating,
				reviewer_id: user.id,
				product_id: product.id
			})
		})
		.catch (err => {
				console.log(`error setting up reviews: ${err}`);
		})
	})
}

module.exports = seedReviews;