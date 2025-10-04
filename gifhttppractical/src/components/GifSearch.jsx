import React, { Component } from 'react';
import styled from 'styled-components'


const Form = styled.form`

display: flex;

gap: 25px;
justify-content: center;
background: #0a0e29;
margin: 0;
padding: 20px;`
const Button = styled.button`
padding: 10px 20px;
font-size: 16px;
background-color: #304b78;
color: #dbb13b;
border: none;
border-radius: 5px;`
const Input = styled.input`
width: 300px;
padding: 10px;
font-size: 16px;
border: none;
border-radius: 5px;
background-color: #304b78;
color: #dbb13b;`


export default class GifSearch extends Component {
  state = { input: '' };

  handleChange = (e) => this.setState({ input: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.state.input.trim();
    if (!value) return;
    this.props.onSubmit(value);
   
    this.setState({ input: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <Form className="form" onSubmit={this.handleSubmit}>
          <Button type="submit" className="button">
            <span className="button-label">Search</span>
          </Button>
          <Input
            className="input"
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Search GIFs"
            autoComplete="off"
          />
        </Form>
      </header>
    );
  }
}
