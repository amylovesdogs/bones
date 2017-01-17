import React from 'react'
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {NavDropdown, MenuItem} from 'react-bootstrap';

const ProductMenu = ({ categories }) => (
	<NavDropdown title='Products' id='product-categories'>
		{
			categories.map(category => (
				<LinkContainer to={`/products/categories/${category.id}`} key={category.id}>
					<MenuItem>{category.name}</MenuItem>
				</LinkContainer>
			))
		}
		<LinkContainer to="/products" key="all">
					<MenuItem>All</MenuItem>
		</LinkContainer>
	</NavDropdown>
);

export default connect (
  ({ categories }) => ({ categories }),
  {},
) (ProductMenu);