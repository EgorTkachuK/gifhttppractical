import React, { Component } from 'react';
import GifSearch from './components/GifSearch';
import GifList from './components/GifList';

export default class App extends Component {
  state = {
    query: '',
  };

  handleSearch = (q) => {
    this.setState({ query: q });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <GifSearch onSubmit={this.handleSearch} />
        <GifList keyword={query} />
      </div>
    );
  }
}
