import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import { LIST_VIEW, CHART_VIEW } from './utility.js'

const items = [
  {
    "id": 1,
    "title": "这是一个标题",
    "price": 200,
    "date": "2018-01-01",
    "category": {
      "id": "1",
      "name": "JOY",
      "type": "income",
      "iconName": "ios-plane"
    }
  },
  {
    "id": 2,
    "title": "这是一个标题",
    "price": 400,
    "date": "2018-01-01",
    "category": {
      "id": "1",
      "name": "JOY",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <PriceList onDeleteItem={(item) => {console.error(item)}} onModifyItem={(item) => {console.log(item)}} items={items} />
        <ViewTab activeTab={LIST_VIEW} onTabChange={(view) => {}} />
      </div>
    );
  }
}

export default App;
