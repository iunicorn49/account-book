import React, { Component, Fragment } from 'react'
import PriceForm from '../components/PriceForm'
import CategorySelect from '../components/CategorySelect'
import Tabs, { Tab } from '../components/Tabs'

import { testCategories } from '../data'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'

import { AppContext } from '../App'

class Create extends Component {
  constructor(props) {
    super(props)

  }

  onFormSubmit = () => {

  }

  onCancelSubmit = () => {
    
  }
  
  render() {
    const filterCategories = testCategories.filter(category => category.type === TYPE_OUTCOME)
    return (
      <AppContext.Consumer>
      {({state}) => {
        return (
          <div className="create-page py-3 px-3 rounded mt-3">
            <Tabs activeIndex={0} onTabChange={() => {}}>
              <Tab>支出</Tab>
              <Tab>收入</Tab>
            </Tabs>
            <CategorySelect categories={filterCategories} onSelectCategory={() => {}} /> 
            <PriceForm onFormSubmit={this.onFormSubmit} onCancelSubmit={this.onCancelSubmit} />
          </div>
        )
      }}
      </AppContext.Consumer>
    )
  }
}

export default Create