import React, {Component} from 'react';
import axios from 'axios';
import CarouselItem from './CarouselItem';

class Carousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		axios.get('/api/products/trending')
		.then(res => res.data)
		.then(products => {
			this.setState({
				products
			})
		})
		.catch(console.log)
	}

	render() {

		const products = this.state.products;

		return (
			<div className="container">
			    <div className="row">
			        <div className="row">
			            <div className="col-md-12 text-center">
			                <h3>Trending Products</h3>
			            </div>
			        </div>
			        <div id="carousel-example-generic" className="carousel slide hidden-xs" data-ride="carousel">
			            <div className="carousel-inner">
			                <div className="item active">
			                    <div className="row">
			                    {
			                    	products.map(product => <CarouselItem product={product} key={product.id}/>)
			                    }
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			)
	}

}

export default Carousel;