import React, { Component } from 'react'

class TestComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '巴拉巴拉巴拉',
			age: 19,
		}
	}
	sendFormData = () => { // 让父组件调用, 将这里的state传递出去
		return this.state
	}
	render() {
		return (
			<div>假装是一个表单</div>
		)
	}
}

export default TestComponent