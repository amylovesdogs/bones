import React from 'react'
import {Link} from 'react-router';
import {NavDropdown, MenuItem} from 'react-bootstrap';

const CategoriesMenu = ({ categories }) => (
	<NavDropdown title='Categories' id='categories'>
		{
			categories.map(category => (<MenuItem key={category.id}>{category.name}</MenuItem>))
		}
	</NavDropdown>
);

import {connect} from 'react-redux';

export default connect (
  ({ categories }) => ({ categories }),
  {},
) (CategoriesMenu);