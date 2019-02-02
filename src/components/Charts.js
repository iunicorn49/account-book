import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

import { Colors } from '../utility'

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
{name: 'Group C', value: 300}, {name: 'Group D', value: 200},
{name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const colorsArr = Object.keys(Colors).map(key => Colors[key])

class Charts extends Component {
	render() {
		const { title, categoryData} = this.props
		if (!categoryData || !categoryData.length) {
			return <h3 className="text-center mx-3">{title} 还没有任何数据</h3>
		}
		return (
			<div className="chart-component">
				<h3 className="text-center mx-3">{title}</h3>
				<ResponsiveContainer width={'100%'} height={300}>
					<PieChart>
						<Pie dataKey="value" isAnimationActive={false} data={categoryData} cx={'50%'} cy={'50%'} outerRadius={100} fill="#8884d8" label>
						{
							categoryData.map((entry, index) => <Cell key={index} fill={colorsArr[index % colorsArr.length]}/>)
						}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

Charts.propTypes = {
	title: PropTypes.string,
	categoryData: PropTypes.array
}

export default Charts