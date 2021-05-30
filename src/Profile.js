import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user } = this.props.auth0;
    // return <div>Hello {user.name}</div>;
    console.log(user);
    return(   
            <>
            <div>Hello {user.name}</div>
            <img src={user.picture} alt='' />
            <div>Your Email:{user.email}</div>
            </>
             
    )
  }
}

export default withAuth0(Profile);