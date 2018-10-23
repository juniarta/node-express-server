import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
    user: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:9009/api/v1/user/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log('-------------RES', res);
        res.data && res.data.user && <Redirect to="/dashboard" />;
      })
      .catch(err => {
        console.error('ERR', err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">submit</button>
        </form>
        {this.state.user && <pre>{this.state.user._id}</pre>}
      </div>
    );
  }
}

export default Login;
