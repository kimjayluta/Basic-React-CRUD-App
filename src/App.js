import React, { Component } from "react";
import ProducItem from "./ProductItem";
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
      products: JSON.parse(localStorage.getItem("prod"))
    };

    this.onDelete = this.onDelete.bind(this);
  }

  UNSAFE_componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
  }

  onDelete(name) {
    const products = this.getProducts();

    const filteredProd = products.filter(product => {
      return product.name !== name;
    });

    this.setState({ products: filteredProd });
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>
        {this.state.products.map(product => {
          return (
            <ProducItem
              key={product.name}
              {...product}
              onDelete={this.onDelete}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
