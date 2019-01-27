import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './containers/Home'
import Create from './containers/Create'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/edit/10">Edit</Link>
          </div>
          <div className="container pd-5">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
