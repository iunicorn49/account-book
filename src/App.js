import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './containers/Home'
import Create from './containers/Create'
import MyTest from './containers/MyTest'

import { flatternArr, ID, parseToYearAndMonth } from './utility'

export const AppContext = React.createContext()

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth(),
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({isLoading: true})
        return cb(...args)
      }
    }
    this.actions = {
      selectNewMonth: withLoading(async ({year, month}) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_ordec=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: {year, month},
          isLoading: false
        })
        return items
      }),
      getInitalData: withLoading(async () => {
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_ordec=desc`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])
        const [categories, items ] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false
        })
        return items
      }),
      getEditData: withLoading(async (id) => {
        const { items, categories } = this.state
        let promiseArr = []
        if (!Object.keys(categories).length) {
          promiseArr.push(axios.get('/categories'))
        }
        const itemAlreadyFeched = Object.keys(items).includes(id)
        if (id && !itemAlreadyFeched) {
          const getURLwithID = `/items/${id}`
          promiseArr.push(axios.get(getURLwithID))
        }
        const results = await Promise.all(promiseArr)
        const [fetchedCategories, editItem] = results
        console.log({fetchedCategories, editItem})
        const finalCategories = fetchedCategories ? flatternArr(fetchedCategories.data) : categories
        const finalItem = editItem ? editItem.data : items[id]
        let state = {
          isLoading: false,
          categories: finalCategories
        }
        if (id) {
          state.items = {...this.state.items, [id]: finalItem}
        }
        this.setState(state)
        return {
          categories: finalCategories,
          editItem: finalItem
        }
      }),
      deleteItem: withLoading(async (item) => {
        const deleteItem = await axios.delete(`/items/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items,
          isLoading: false
        })
        return deleteItem.data
      }),
      createItem: withLoading(async (data, categoryId) => {
        const newId = ID()
        const parseDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parseDate.year}-${parseDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', {...data, id: newId, cid: categoryId})
        this.setState({
          items: {...this.state.items, [newId]: newItem.data},
          isLoading: false
        })
        return newItem.data
      }),
      updateItem: withLoading(async (item, updatedCategoryId) => {
        const updateData = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        const modifedItem  = await axios.put(`/items/${item.id}`, updateData)
        this.setState({
          items: {...this.state.items, [modifedItem.id]: modifedItem.data }
        })
        return modifedItem.data
      })
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
