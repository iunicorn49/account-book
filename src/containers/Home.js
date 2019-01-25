import React, { Component, Fragment } from 'react'

import logo from '../logo.svg'
import { 
	LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME,
	parseToYearAndMonth, padLeft
} from '../utility.js'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'

import { items, categoies } from '../data'

const newItem = {
	"id": 1,
	"title": "新纪录",
	"price": 200,
	"date": "2019-01-11",
	"cid": "1"
}

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items,
			currentDate: parseToYearAndMonth(),
			tabView: LIST_VIEW
		}
	}
	render() {
		const { items, currentDate, tabView } = this.state
		const itemWithCategory = items.map(item => {
			item.category = categoies[item.cid]
			return item
		}).filter(item => {
			return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
		})
		let totalIncome = 0, totalOutcome = 0
		itemWithCategory.forEach((item) => {
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
							<MonthPicker year={currentDate.year} month={currentDate.month} onChange={this.changeDate}/></div>
						<div className="col">
							<TotalPrice income={totalIncome} outcome={totalOutcome} />
						</div>
					</div>
				</header>
				<div className="content-area py-3 px-3">
					<ViewTab activeTab={tabView} onTabChange={this.changeView} />
					<CreateBtn onClick={this.createItem} />
					{
						tabView === LIST_VIEW &&
						<PriceList onDeleteItem={this.deleteItem} onModifyItem={this.modifyItem} items={itemWithCategory} />
					}
					{
						tabView === CHART_VIEW &&
						<div>图标</div>
					}
				</div>
			</Fragment>
		)
	} // render

	changeView = (view) => {
		this.setState({
			tabView: view
		})
	}

	changeDate = ({year, month}) => {
		this.setState({
			currentDate: {year, month}
		})
	}

	modifyItem = (modifiedItem) => {
		const modifiedItems = this.state.items.map(item => {
			if (item.id === modifiedItem.id) {
				return {...item, title: '更新后的标题'}
			} else {
				return item
			}
		})
		this.setState({
			items: modifiedItems
		})
	}

	createItem = () => {
		this.setState({
			items: [newItem, ...this.state.items]
		})
	}

	deleteItem = (deletedItem) => {
		console.log(deletedItem)
		const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id)
		this.setState({
			items: filteredItems
		})
	}

}

export default Home