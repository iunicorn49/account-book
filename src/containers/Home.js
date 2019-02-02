import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import logo from '../logo.svg'
import { 
	LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME,
	parseToYearAndMonth, padLeft
} from '../utility.js'
import PriceList from '../components/PriceList'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'
import Tabs, { Tab } from '../components/Tabs'
import Ionicon from 'react-ionicons'

import withContext from '../withContext'
import Loader from '../components/Loader'

import Charts from '../components/Charts'

const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
	let categoryMap = {}
	items.filter(item => item.category.type === type).forEach(item => {
		if (categoryMap[item.cid]) {
			categoryMap[item.cid].value += (+item.price)
			categoryMap[item.cid].items.push(item.id)
		} else {
			categoryMap[item.cid] = {
				name: item.category.name,
				value: +item.price,
				items: [item.id]
			}
		}
	})
	return Object.values(categoryMap)
}

const tabsText = [LIST_VIEW, CHART_VIEW]
class Home extends Component {
	constructor(props) {
		super(props)
		const { items } = props.data
		this.state = {
			items,
			tabView: CHART_VIEW
		}
	}
	componentDidMount() {
		this.props.actions.getInitalData()
	}
	render() {
		const { tabView } = this.state
		const { items, categories, currentDate, isLoading } = this.props.data
		const { selectNewMonth } = this.props.actions
		const itemWithCategory = Object.keys(items).map(id => {
			items[id].category = categories[items[id].cid]
			return items[id]
		})
		let totalIncome = 0, totalOutcome = 0
		itemWithCategory.forEach((item) => {
			if (item.category.type === TYPE_INCOME) {
				totalIncome += item.price
			} else {
				totalOutcome += item.price
			}
		})
		const chartOutcomeDataByCategory = generateChartDataByCategory(itemWithCategory, TYPE_OUTCOME)
		const chartIncomeDataByCategory = generateChartDataByCategory(itemWithCategory, TYPE_INCOME)
		const activeIndex = tabsText.findIndex(item => item === tabView)
		return (
			<Fragment>
				<header className="App-header">
					<div className="row mb-5 justify-content-center">
						<img src={logo} className="App-logo" alt="logo" />
					</div>
					<div className="row">
						<div className="col">
							<MonthPicker year={currentDate.year} month={currentDate.month} onChange={selectNewMonth}/></div>
						<div className="col">
							<TotalPrice income={totalIncome} outcome={totalOutcome} />
						</div>
					</div>
				</header>
				<div className="content-area py-3 px-3">
					<Tabs activeIndex={activeIndex} onTabChange={this.changeView}>
						<Tab>
							<Ionicon 
								className="rounded-circle mr-2" 
								fontSize="25px" 
								color="#007bff" 
								icon="ios-paper"
							/>
							列表模式
						</Tab>
						<Tab>
							<Ionicon 
								className="rounded-circle mr-2" 
								fontSize="25px" 
								color="#007bff" 
								icon="ios-pie"
							/>
							图表模式
						</Tab>
					</Tabs>
					<CreateBtn onClick={this.createItem} />
					{
						isLoading &&
						<Loader />
					}
					{
						!isLoading &&
						<Fragment>
						{
							tabView === LIST_VIEW &&
							<PriceList onDeleteItem={this.deleteItem} onModifyItem={this.modifyItem} items={itemWithCategory} />
						}
						{
							tabView === CHART_VIEW &&
							<Fragment>
								<Charts title="本月支出" categoryData={chartOutcomeDataByCategory} />
								<Charts title="本月收入" categoryData={chartIncomeDataByCategory} />
							</Fragment>
						}
						</Fragment>
					}
				</div>
			</Fragment>
		)
	} // render

	changeView = (index) => {
		this.setState({
			tabView: tabsText[index]
		})
	}

	modifyItem = (modifiedItem) => {
		this.props.history.push('/edit/' + modifiedItem.id)
	}

	createItem = () => {
		this.props.history.push('/create')
	}

	deleteItem = (deletedItem) => {
		this.props.actions.deleteItem(deletedItem)
	}

}

export default withRouter(withContext(Home))