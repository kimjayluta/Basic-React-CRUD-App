import React, { Component } from "react";
import ProducItem from "./ProductItem";
import AddProduct from "./AddProduct";
import "./App.css";

const Products = [
  {
    name: "Default Product",
    price: 200
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
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
  }

  onAdd(name, price) {
    const products = this.getProducts();

    products.push({
      name,
      price
    });

    localStorage.setItem("prod", JSON.stringify(products));
    this.setState({ products });
  }

  onDelete(name) {
    const products = this.getProducts();

    const filteredProd = products.filter(product => {
      return product.name !== name;
    });

    localStorage.setItem("prod", JSON.stringify(filteredProd));
    this.setState({ products: filteredProd });
  }

  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();

    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }
      return product;
    });

    localStorage.setItem("prod", JSON.stringify(products));
    this.setState({ products });
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>
        <AddProduct onAdd={this.onAdd} />
        {this.state.products.map(product => {
          return (
            <ProducItem
              key={product.name}
              {...product}
              onDelete={this.onDelete}
              onEditSubmit={this.onEditSubmit}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
