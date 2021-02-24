import React, { Component } from "react";

import "./Modal.css";

class Modal extends Component {
  render() {
    console.log(this.props, 'sk');
    var {data} = this.props
    return (
      <>
        {this.props.show && (
          <div className="custom-modal">
              <button onClick={this.props.onHide} style={{float:'right'}}>X</button>
               <img  src={data.image} className="img-rounded" alt={{data}.name}/>
               <h6>Name: {data.name}</h6>
               <h6>Gender: {data.gender}</h6>
               <h6>Email: {data.email}</h6>
               <h6>Address: {data.address}</h6>
               <h6>Phone: {data.phone}</h6>
               <h6>DOB: {data.dob}</h6>
          </div>
        )}
      </>
    );
  }
}

export default Modal;