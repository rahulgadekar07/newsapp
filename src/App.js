import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize=12;
  apiKey=process.env.REACT_APP_NEWS_API;
  state={
    progress:10
  }
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946"
          progress={this.state.progress}
          height={3}
          />
        
          <Routes>
         
            <Route
              exact
              path="/"
              element={
                <News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} category={"general"} country={"in"} />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} category={"business"} country={"in"} />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category={"entertainment"} country={"in"} />
              }
            ></Route>
            <Route
              exact
              path="/general"
              element={
                <News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} category={"general"} country={"in"} />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} category={"health"} country={"in"} />}
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} category={"science"} country={"in"} />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category={"sports"} country={"in"} />}
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category={"technology"} country={"in"} />
              }
            ></Route>
          </Routes>
        
        </Router>
      </>
    );
  }
}
