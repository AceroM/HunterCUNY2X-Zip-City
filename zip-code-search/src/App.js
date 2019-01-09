import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Card = props => {
  return (
      <div className="card-container">
          <h2> {props.name}</h2>
          <ul>
              <li>State: {props.place}</li>
              <li>Location: {props.location}</li>
              <li>Population (estimated): {props.population}</li>
              <li>Total Wages: {props.wages} </li>
          </ul>
      </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardArr: [],
      zip: "",
      isError: false
    }
  }

  handleEnter = (e) => {
    if (e.keyCode == 13) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zip}`)
      .then(res => res.json())
      .then(zip => {
        console.log(zip)
        let newState = zip.map(item => {
          return (
            {
              name: item.LocationText,
              place: item.State,
              location: `(${item.Lat}, ${item.Long})`,
              population: item.EstimatedPopulation,
              wages: item.TotalWages
            }
          )
        })
        this.setState({ cardArr: newState })
      })
      .catch((err) => {
        console.error(err);
        this.setState({ isError: true })
      })
    }
  }

  handleChange = (e) => {
    this.setState({zip: e.target.value})
  }

  render() {
    const Cards = this.state.cardArr.map(values => (
      <Card 
        name={values.name}
        place={values.place}
        location={values.location}
        population={values.population}
        wages={values.wages}
      />
    ))

    return (
      <div className="App">
        <header>
          <h1> Zip Code Search </h1>
        </header>
        Zip Code:
        <input type="text"
          onKeyDown={this.handleEnter}
          onChange={this.handleChange} 
          value={this.state.zip} 
          id="search"
        />
        { this.state.isError ?
          <p> No Results </p>
          : ""
        }
      { Cards }
      </div>
    );
  }
}

export default App;
