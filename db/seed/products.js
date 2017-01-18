const db = require('APP/db');

const products =
[
  {
  	name: 'Nimbus 2000',
	  description: 'A fine quidditch starter model.',
	  price: 34999,
	  quantity: 100,
	  photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551',
	  category: 'Broomsticks'
	},
	{
    name: 'Nimbus 2001',
    description: 'Moving up a bit. Intermediate quidditch model.',
    price: 44999,
    quantity: 100,
    photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551',
		category: 'Broomsticks'
  },
	{
    name: 'Firebolt',
    description: 'For the professional or advanced amateur quidditch player.',
    price: 75000,
    quantity: 100,
    photoURL: 'https://www.elitefts.com/wp/wp-content/uploads/2011/10/795365_92276264.jpg',
		category: 'Broomsticks'
  },
  {name: 'Computer Programming for Beginners',
	 description: 'Learn the Basics of Java',
	 price: 1182,
	 quantity: 10,
	 photoURL: 'https://pbs.twimg.com/media/CcuYraMXIAE5Yn6.jpg',
	 category: 'Muggle Stuff'
  },
  {name: ' A Complete Guide For Beginners',
	 description: 'Become An Expert In Python Programming ',
	 price: 1438,
	 quantity: 15,
	 photoURL: 'https://s-media-cache-ak0.pinimg.com/736x/df/bd/62/dfbd620eb7ab1af7dddb3fce67101f09.jpg',
	 category: 'Muggle Stuff'
	},
  {name: "Ry's Git Tutorial",
	 description: 'Git is a free version control system',
	 price: 199,
	 quantity: 25,
	 photoURL: 'https://pbs.twimg.com/media/Cr7mS_OWcAA7Hzt.jpg',
	 category: 'Muggle Stuff'
	},
	{name: "Harry Potter's Wand",
	 description: 'Wood: holly, Core: phoenix feather, donated by Fawkes, phoenix owned by Albus Dumbledore, Length: 11 inches Rigidity: Supple',
	 price: 25099,
	 quantity: 1,
	 photoURL: "http://vignette2.wikia.nocookie.net/harrypotter/images/6/63/Harry_Potter's_Wand.png/revision/latest?cb=20150115092133",
	 category: 'Wands'
	},
	{name: "Hermione Grangers's Wand",
	 description: 'Wood: vine, Core: dragon heartstring, Length: 10 3/4 inches',
	 price: 25099,
	 quantity: 1,
	 photoURL: "http://img.fortheloveofharry.com/2015/08/Rubies-Hermione-Granger-Wand.jpg",
	 category: 'Wands'
	},
	{name: "Ron Weasleys's First Wand",
	 description: 'Wood: ash, Core: Unicorn hair, Length: 12 inches. A little broken',
	 price: 25099,
	 quantity: 1,
	 photoURL: "https://secure.polyvoreimg.com/cgi/img-thing/size/l/tid/32107926.jpg",
	 category: 'Wands'
	},
	{
	 name: "Unicorn Hair",
	 description: 'Certified authentic and pure',
	 price: 15099,
	 quantity: 25,
	 photoURL: "http://vignette1.wikia.nocookie.net/harrypotter/images/3/3f/Unicorn-tail-hair-lrg.png/revision/latest?cb=20161207025952",
	 category: 'Potion Ingredients'
	},
	{
	 name: "Bezoar",
	 description: 'Taken from the stomach of a goat. Antidote to most poisons',
	 price: 12099,
	 quantity: 32,
	 photoURL: "http://vignette4.wikia.nocookie.net/harrypotter/images/a/a4/BezoarPottemore.png/revision/latest?cb=20130805123032",
	 category: 'Potion Ingredients'
	},
	{
	 name: "Occamy Egg",
	 description: 'Made of pure silver. The shell is an essential ingredient for Felix Felicis.',
	 price: 120099,
	 quantity: 1,
	 photoURL: "http://vignette3.wikia.nocookie.net/harrypotter/images/4/42/OccamyEgg.png/revision/latest/scale-to-width-down/250?cb=20140706022011",
	 category: 'Potion Ingredients'
	}
]

const setProductCategory = (product_id, category_id) => {
	return db.model('product_categories').create({
		product_id,
		category_id
	});
}

const seedProducts = () =>
db.Promise.map(products, (product, index) => {
	return db.model('products')
	.create(product)
	.then(product => {
		return db.model('categories').find({
			where: {
				name: products[index].category
			}
		})
		.then(category => {
			return setProductCategory(product.id, category.id);
		})
	});
});

module.exports = seedProducts;