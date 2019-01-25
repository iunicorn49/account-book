import React, { Component, Fragment } from 'react'

import logo from '../logo.svg'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME } from '../utility.js'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'

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

class Home extends Component {
	render() {
		let totalIncome = 0, totalOutcome = 0
		items.forEach((item) => {
			if (item.category.type === TYPE_INCOME) {
				totalIncome += item.price
			} else {
				totalOutcome += item.price
			}
		})
		return (
			<Fragment>
				<header className="App-header">
					<div className="row mb-5 justify-content-center">
						<img src={logo} className="App-logo" alt="logo" />
					</div>
					<div className="row">
						<div className="col">
							<MonthPicker year={2011} month={1} onChange={({year, month}) => {console.log({year, month})}}/></div>
						<div className="col">
							<TotalPrice income={totalIncome} outcome={totalOutcome} />
						</div>
					</div>
				</header>
				<div className="content-area py-3 px-3">
					<ViewTab activeTab={LIST_VIEW} onTabChange={(view) => {}} />
					<CreateBtn onClick={() => {}} />
					<PriceList onDeleteItem={(item) => {console.error(item)}} onModifyItem={(item) => {console.log(item)}} items={items} />
				</div>
			</Fragment>
		)
	}
}

export default Home