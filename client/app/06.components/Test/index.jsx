import React, { Component } from 'react';

import axios from 'axios';

class Test extends Component {
  state = {
    message: ''
  };

  componentDidMount() {
    axios.get('http://localhost:9009/check').then(res => {
      this.setState({
        message: res.data.message
      });
    });
  }

  render() {
    return (
      <div>
        <h1>This is the message:</h1>
        {this.state.message && (
          <pre style={{ backgroundColor: 'yellow' }}>{this.state.message}</pre>
        )}
      </div>
    );
  }
}

export default Test;
