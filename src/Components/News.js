import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:'in',
    category:'general',
    pageSize:6
  }
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
    pageSize:PropTypes.number,
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    this.props.setProgress(30);

    let data = await fetch(url);
    this.props.setProgress(50);
    let parseData = await data.json();
    this.props.setProgress(80);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  prevClick = async () => {
    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    this.props.setProgress(30);

    let data = await fetch(url);
    this.props.setProgress(50);

    let parseData = await data.json();
    this.props.setProgress(80);

    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false,
    });
    this.props.setProgress(100);

    // console.log("Previous");
  };
  nextClick = async () => {
    this.props.setProgress(10);

    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
        this.state.page + 1
        
      }&pageSize=${this.props.pageSize}`;
      
      this.setState({
        loading: true,
      });
      this.props.setProgress(30);
      let data = await fetch(url);
      this.props.setProgress(50);

      let parseData = await data.json();
      this.props.setProgress(80);

      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
        loading: false,
      });
      this.props.setProgress(100);

    }
  };
  render() {
    return (
      <div className="container my-3">
         

        <h1 className="text-center  " style={{margin:'80px 30px'}}>Newsmonkey - Top Headlines</h1>
        
        <div className="row  "style={{margin:'20px 20px'}}>
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4">
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : "No description available.Click below to read more about the news"
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
            );
          })}
          
        </div>
        <div className=" fixed-bottom  container d-flex justify-content-between " s>
          <button
            
            disabled={this.state.page <= 1 }
            type="button"
            onClick={this.prevClick}
            className="btn btn-sm btn-dark my-2"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
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
