import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardArr: [],
      city: "",
      isError: false
    }
  }

  handleEnter = (e) => {
    if (e.keyCode == 13) {
      fetch(`http://ctp-zip-api.herokuapp.com/city/${encodeURIComponent(this.state.city.toUpperCase())}`)
      .then(res => res.json())
      .then(zipCodes => {
      console.log(zipCodes);
          this.setState({
                cardArr: zipCodes,
                isError: false
          });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ isError: true })
      })
    }
  }

  handleChange = (e) => {
    this.setState({city: e.target.value})
  }

  render() {
    const zips = this.state.cardArr.map((zip) => (
        <li>
            {zip}
        </li>
    ));
    return (
      <div className="App">
        <header>
          <h1> City Name Search </h1>
        </header>
        City Name:
        <input type="text"
          onKeyDown={this.handleEnter}
          onChange={this.handleChange} 
          value={this.state.city} 
          id="search"
        />
        { this.state.isError ?
          <p> No Results </p>
          : ""
        }
        <ul>
            {this.state.isError ? "" : zips}
        </ul>
      </div>
    );
  }
}

export default App;
