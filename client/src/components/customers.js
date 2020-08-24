import React, { Component } from 'react';
import './customers.css';

import {Container, Jumbotron} from "react-bootstrap";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  /*componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <h2>Customers</h2>
          <ul>
            {this.state.customers.map(customer =>
                <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
            )}
          </ul>
        </Jumbotron>
      </Container>
    );
  }*/
}

export default Customers;
