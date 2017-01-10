import React from 'react'

// export const Login = ({ login }) => (
//   <form onSubmit={evt => {
//     evt.preventDefault()
//     login(evt.target.username.value, evt.target.password.value)
//   } }>
//     <input name="username" />
//     <input name="password" type="password" />
//     <input type="submit" value="Login" />
//   </form>
// )

// const Login = ({login}) => {
//   return (
//     <div className="row">
//       <div className="col-md-offset-5 col-md-3">
//         <div className="form-login">
//         <h4>Welcome back.</h4>
//         <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" />
//         <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
//         <div className="wrapper">
//         <span className="group-btn">     
//           <a href="#" className="btn btn-primary btn-md">login <i className="fa fa-sign-in"></i></a>
//         </span>
//         </div>
//         </div>
//       </div>
//     </div>    
//   );
// }

const Login = ({login}) => {
  const onLoginSubmit = evt => {
    evt.preventDefault();
    login(evt.target.username.value, evt.target.password.value);
  }

  return (
    <div className="row">
      <div className="row mgn-top-xl">
        <div className="col-md-10 col-md-offset-1">
          <div className="col-md-5">
            <form onSubmit={onLoginSubmit}>
              <div className="form-group">
                <label className="full-width">Username
                  <input type="text" className="form-control" name="username"/>
                </label>
              </div>
              <div className="form-group">
                <label className="full-width">Password
                  <input type="password" className="form-control" name="password"/>
                </label>
              </div>
               <button type="submit" className="btn btn-success center-block">Login</button>
            </form>
          </div>
          <div className="col-md-2 pdng-top-lg">
            <h1 className="text-center">OR</h1>
          </div>
          <div className="col-md-5">
            <button type="button" className="btn btn-danger btn-lg btn-block">Sign in with Google</button>
          </div>
        </div>
      </div>
    </div>
  );  
}


import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
