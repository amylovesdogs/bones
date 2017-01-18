import React from 'react';
import {Link} from 'react-router';
import ProductMenu from './ProductMenu';

export default () => {
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <img src = "http://vignette2.wikia.nocookie.net/harrypotter/images/a/ac/Logo_HP.png/revision/latest?cb=20130804205525" className="logo"/>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="#">Home</Link></li>
            <ProductMenu/>
            <li><Link to="/deals">Deals</Link></li>
            <li><Link to="/contacts">Contact</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/login"><span className="glyphicon glyphicon-user"></span> Login</Link></li>
            <li><Link to="/cart"><span className="glyphicon glyphicon-shopping-cart"></span> Cart</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}