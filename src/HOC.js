import React, { Component } from "react";

// export const foo = (Comp) => (props) => {
//   return (
//     <div className="border">
//       This is Hoc component
//       <Comp {...props} />
//     </div>
//   );
// };

export const foo = (Comp) => {
  return class InputHoc extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <div style={{border: '1px solid red',padding: '10px'}}>
          this is Hoc secondtype 
          <Comp {...this.props}></Comp>
        </div>
      );
    }
  };
};
