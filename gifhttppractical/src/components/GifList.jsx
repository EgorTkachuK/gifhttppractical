import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'


const List = styled.ul`
list-style: none;
display: flex;
flex-wrap: wrap;
gap: 25px;
justify-content: center;
background: #0a0e29;
margin: 0;
padding: 20px;`
const ListItem = styled.li`
max-width: 100%;
mah-height: 100%;
display: flex;
align-items: center;
justify-content: center;

`
const Img = styled.img`
max-width: 275px;
max-height: 275px;
border-radius: 10px;
`
const LoadMoreButton = styled.button`
padding: 10px 20px;
font-size: 16px;
border: none;
border-radius: 5px;
background-color: #2494a2;
color: #dbb13b;
`

const LoadMoreContainer = styled.div`
display: flex;
justify-content: center;
background: #0a0e29;`
const Loading = styled.div`
text-align: center;
font-size: 18px;
background: #0a0e29;
color: #dbb13b;
`

const BASE_URL = 'https://tenor.googleapis.com/v2/search';
const LIMIT = 12;
const TENOR_KEY = 'AIzaSyA41XzNqEl0FnSG5-Ja0VH8iKL4Tk5j2P0';

export default class GifList extends Component {
  state = {
    gifs: [],
    loading: false,
    error: null,
    pos: null
  };

  componentDidMount() {
    const q = (this.props.keyword || 'hobbit').trim();
    this.fetchGifs(q, null, true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keyword !== this.props.keyword) {
      const q = (this.props.keyword || 'trending').trim();
      this.setState({ gifs: [], pos: null, error: null }, () => this.fetchGifs(q, null, true));
    }
  }

  fetchGifs = async (q, pos = null, replace = false) => {
    if (!q) return;
    this.setState({ loading: true, error: null });

    try {
      const res = await axios.get(BASE_URL, {
        params: {
          key: TENOR_KEY,
          q,
          limit: LIMIT,
          pos: pos || undefined
        }
      });

      const results = Array.isArray(res.data && res.data.results) ? res.data.results : [];
      const nextPos = res.data && res.data.next ? res.data.next : null;

      const mapped = results.map(r => {
        const mf = r.media_formats || {};
        const url = (mf.gif && mf.gif.url) || '';
        return { id: r.id, url, title: r.content_description || r.title || '' };
      }).filter(x => x.url);

      this.setState(prev => ({
        gifs: replace ? mapped : [...prev.gifs, ...mapped],
        pos: nextPos,
        loading: false
      }));
    } catch (err) {
      this.setState({
        error: err.message || 'Error fetching GIFs',
        loading: false
      });
    }
  };

  handleLoadMore = () => {
    const q = (this.props.keyword || 'hobbit').trim();
    if (!q) return;
    this.fetchGifs(q, this.state.pos, false);
  };

  render() {
    const { gifs, loading, error, pos } = this.state;
    return (
      <div>
        {error && <div >{error}</div>}

        <List >
          {gifs.map(g => (
            <ListItem key={g.id}>
              <Img src={g.url} alt={g.title} />
            </ListItem>
          ))}
        </List>

        {loading && <Loading>Loading...</Loading>}

        {gifs.length > 0 && pos && !loading && (
          <LoadMoreContainer>
            <LoadMoreButton onClick={this.handleLoadMore}>Load more</LoadMoreButton>
          </LoadMoreContainer>
        )}
      </div>
    );
  }
}
