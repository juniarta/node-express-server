import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    fetch('/check')
      .then(res => res.json())
      .then(data => {
        this.setState({
          message: data.message
        });
      });
  }

  render() {
    return (
      <div>
        <h1>This is the message: {this.state.message}</h1>
      </div>
    );
  }
}

export default Test;
