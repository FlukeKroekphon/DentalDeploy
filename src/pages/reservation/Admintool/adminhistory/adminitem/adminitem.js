import axios from "axios";
import React, { Component } from "react";
import Adminconfirm from "../../Adminconfirm";

class Adminitem extends Component {
  state = {
    count: this.props.value
  };

  handleIncrement = e => {
    this.setState({ count: this.state.count + 1 });
  };

 onDelete(){
   let Adminconfirm = this.styleCardHeader;
   axios.delete('http://localhost');
 }

  render() {
    return (
      <React.Fragment>

          <div style={{ height:'50px',paddingLeft:'360px',paddingBottom:'0px',paddingTop:'5px'}} className="card-body">
            <button onClick={this.onDelete.bind(this)} style={{width:'85px',height:'25px'}} className="btn btn-lg btn-outline-danger ml-4">
              <h6>Delete</h6>
            </button>
          </div>
      </React.Fragment>
    );
  }

  styleCardHeader() {
    let classes = "card-header h4 text-white bg-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  styleCount() {
    const { count } = this.state;
    return count === 0 ? "No Items!" : count;
  }
}

export default Adminitem;