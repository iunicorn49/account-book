import React, { Component, Context } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './containers/Home'
import Create from './containers/Create'
import MyTest from './containers/MyTest'

import { testCategories, testItems } from './data'
import { flatternArr } from './utility'

export const AppContext = React.createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    }
  }
  render() {
    const state = this.state
    return (
      <AppContext.Provider value={{state}}>
        <Router>
          <div className="App">
            <div className="link-wrapper">
              <Link className="link-item" to="/test">MyTest</Link>
              <Link className="link-item" to="/">Home</Link>
              <Link className="link-item" to="/create">Create</Link>
              <Link className="link-item" to="/edit/10">Edit</Link>
            </div>
            <div className="container pd-5">
              <Route path="/test" component={MyTest} />
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    )
  }
}

export default App
