import React, { Component } from 'react'
import TestComponent from '../components/TestComponent'

class MyTest extends Component {
	handleClick = (event) => { // 点击按钮, 获取表单组件的数据
		let data = this.refs.form.sendFormData()
		console.log('子组件表单数据:', data)
	} 
	render() {
		return (
			<div>
				<h1>测试页面</h1>
				<button onClick={this.handleClick}>获取表单数据</button>
				<TestComponent ref="form" />
			</div>
		)
	}
}

export default MyTest