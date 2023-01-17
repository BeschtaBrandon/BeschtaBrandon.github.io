import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import moment from 'moment';

import './News.scss';

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: []
    };
  }

  componentDidMount() {
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=e6f7827e0da94e2a8f213be575bbf833")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            articles: result.articles
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  renderNewsHeader = () => {
    return (
      <h1>
        Latest News <i className="fas fa-newspaper"></i>
      </h1>
    );
  }

  renderNewsContent = () => {

    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <ListGroup>
            {articles.slice(0,8).map(item => (
              <ListGroupItem className="media" href={item.url}>
                  <div className="media-left">
                    <Image className="media-object" src={item.urlToImage} />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{item.title}</h4>
                    { item.description} {moment(item.publishedAt).format("MMMM D YYYY")}
                  </div>
              </ListGroupItem>
            ))}
        </ListGroup>
      );
    }
  }

  renderNewsAttribution = () => {
    return (
      <a href="https://newsapi.org">Powered by News API</a>
    );
  }

  render () {
    return (
      <div>
        { this.renderNewsHeader() }
        { this.renderNewsContent() }
        { this.renderNewsAttribution() }
      </div>
    );
  }
}

export default News;
