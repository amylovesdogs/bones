import React from 'react';

const CheckoutForm = (props) => {

  const handleChange = (evt) => {
    let key = evt.target.name;
    let val = evt.target.value;
    props.handleChange(key, val);
  }

  return (

    <div className="well col-md-6">
      <h2 className="text-center" style={{marginTop: "0px", marginBottom: "20px"}}>Shipping Address</h2>
      <form className="form-horizontal">
        <fieldset>

          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-md-10">
              <input 
              name="name" 
              type="name" 
              className="form-control"
              onChange={handleChange}
              type="text"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Email</label>
            <div className="col-md-10">
              <input 
              name="email" 
              type="email" 
              className="form-control"
              onChange={handleChange}
              type="text"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Address</label>
            <div className="col-md-10">
              <input 
              name="street" 
              type="street" 
              className="form-control"
              onChange={handleChange}
              type="text"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">City</label>
            <div className="col-md-10">
              <input 
              name="city" 
              type="city" 
              className="form-control"
              onChange={handleChange}
              type="text"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">State</label>
            <div className="col-md-10">
              <input 
              name="state" 
              type="state" 
              className="form-control"
              onChange={handleChange}
              type="text"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Country</label>
            <div className="col-md-10">
              <input 
              name="country" 
              type="country" 
              className="form-control"
              onChange={handleChange}
              type="text"/>
            </div>
          </div>

        </fieldset>
      </form>
    </div>
    )
}

export default CheckoutForm;