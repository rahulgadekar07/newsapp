import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us', // Default to 'us' for the search endpoint
    category: 'general',
    pageSize: 10 // Adjusted to match the example URL
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Initialize as an empty array
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  async componentDidMount() {
    this.props.setProgress(10);
    this.fetchNews();
  }

  fetchNews = async (page = this.state.page) => {
    const { apiKey } = this.props;
    if (!apiKey) {
      console.error('API key is not defined');
      return;
    }
  
    try {
      this.props.setProgress(10);
      const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=${this.props.country}&apikey=${apiKey}`;
  
      this.setState({ loading: true });
      this.props.setProgress(30);
  
      const response = await fetch(url);
  
      if (response.status === 403) {
        throw new Error('Access forbidden: Check your API key and permissions');
      }
  
      if (!response.ok) {
        throw new Error(`Failed to fetch news. Status: ${response.status}`);
      }
  
      const parseData = await response.json();
      this.props.setProgress(80);
  
      this.setState({
        articles: parseData.articles || [],
        totalResults: parseData.totalResults || 0,
        loading: false
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error.message);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  }
  
  
  prevClick = () => {
    if (this.state.page > 1) {
      this.props.setProgress(10);
      this.fetchNews(this.state.page - 1);
      this.setState(prevState => ({
        page: prevState.page - 1
      }));
    }
  }

  nextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.props.setProgress(10);
      this.fetchNews(this.state.page + 1);
      this.setState(prevState => ({
        page: prevState.page + 1
      }));
    }
  }

  render() {
    const { articles, loading, page, totalResults } = this.state;
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '80px 30px' }}>Newsmonkey - Top Headlines</h1>
        <div className="row" style={{ margin: '20px 20px' }}>
          {!loading && articles.length > 0 ? (
            articles.map((element) => (
              <div key={element.url} className="col-md-4">
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : "No description available. Click below to read more about the news"
                  }
                  newsUrl={element.url}
                  imgUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://img.freepik.com/premium-vector/breaking-news-tv-screensaver-vector-media-broadcast-channel-publication-urgent-announcement_8071-2019.jpg?w=826"
                  }
                  author={element.author}
                  time={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))
          ) : (
            !loading && <p>No articles available</p>
          )}
        </div>
        <div className="fixed-bottom container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            onClick={this.prevClick}
            className="btn btn-sm btn-dark my-2"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={page + 1 > Math.ceil(totalResults / this.props.pageSize)}
            onClick={this.nextClick}
            className="btn btn-sm btn-dark my-2"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
