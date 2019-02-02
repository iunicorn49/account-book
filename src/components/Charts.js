import React, { Component } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

import { Colors } from '../utility'

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
{name: 'Group C', value: 300}, {name: 'Group D', value: 200},
{name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const colorsArr = Object.keys(Colors).map(key => Colors[key])

class Charts extends Component {
	render() {
		return (
			<div className="chart-wrapper">
				<PieChart width={400} height={400}>
					<Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
					{
          	data.map((entry, index) => <Cell key={index} fill={colorsArr[index % colorsArr.length]}/>)
          }
					</Pie>
					<Tooltip />
				</PieChart>
			</div>
		)
	}
}

export default Charts