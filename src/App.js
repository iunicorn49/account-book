import React, { Component, Context } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './containers/Home'
import Create from './containers/Create'
import MyTest from './containers/MyTest'

import { testCategories, testItems } from './data'
import { flatternArr, ID, parseToYearAndMonth } from './utility'

export const AppContext = React.createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    }
    this.actions = {
      deleteItem: (item) => {
        const { items } = this.state
        delete items[item.id]
        this.setState({items})
      },
      createItem: (data, categoryId) => {
        const newId = ID()
        const parseDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parseDate.year}-${parseDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = {...data, id: newId, cid: categoryId}
        this.setState({
          items: {...this.state.items, [newId]: newItem}
        })
      },
      updateItem: (item, updatedCategoryId) => {
        const modifedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        this.setState({
          items: {...this.state.items, [modifedItem.id]: modifedItem }
        })
      }
    }
  }
  render() {
    const state = this.state
    const actions = this.actions
    return (
      <AppContext.Provider value={{state, actions}}>
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
