import React, { Component } from "react";
import "./App.css";

const Products = [
  {
    name: "iPad",
    price: 200
  },
  {
    name: "iPhone",
    price: 650
  }
];

localStorage.setItem("prod", JSON.stringify(Products));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  UNSAFE_componentWillMount() {
    const products = JSON.parse(localStorage.getItem("prod"));

    this.setState({ products });
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>
      </div>
    );
  }
}

export default App;
