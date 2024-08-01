import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="bg-dark position-sticky   text-center text-white  text-lg-start">
       
          <div
            className="text-center p-3"
            style={{backgroundColor:'rgb(0, 0, 0, )'}}
          >
            © 2024 NewsMonkey
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
