import React from 'react'

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return <h2>{ this.state.date.getMonth() }</h2>;
  }
}

export default Hello;

