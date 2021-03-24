import React, { Component } from 'react';

const Input = props => {
  return <input {...props} />;
}

class CustomizeInput extends Component {
  render() {
    const { value = "", ...otherProps } = this.props
    return (
      <div style={{padding: 10}}>
        <Input style={{outline:"none"}} value={value} {...otherProps} />
      </div>
    );
  }
}
 
export default CustomizeInput;