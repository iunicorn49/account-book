import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'

class MonthPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: props.year,
      selectedMonth: props.month
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }
  handleClick = (event) => { // 传说中的 outsideClick
    // node 在render函数找那个绑定这里的顶层dom, 给文档绑定事件, 点击关闭下拉菜单, 但是点击到这个组件上时, 不关闭
    if (this.node.contains(event.target)) {
      return
    }
    this.setState({
      isOpen: false,
    })
  }
  toggleDropdown = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  selectYear = (event, yearNumber) => {
    event.preventDefault()
    this.setState({
      selectedYear: yearNumber
    })
  }
  selectMonth = (event, monthNumber) => {
    event.preventDefault()
    this.setState({
      selectedMonth: monthNumber,
      isOpen: false,
    })
    this.props.onChange({
      year: this.state.selectedYear,
      month: monthNumber
    })
  }
  render() {
    const { year, month } = this.props
    const { isOpen, selectedYear, selectedMonth } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(item => item + year)

    return (
      <div className="dropdown month-picker-component" ref={(ref) => {this.node = ref}}>
        <h4>选择月份</h4>
        <button
          onClick={this.toggleDropdown}
          className="btn btn-lg btn-secondary dropdown-toggle"
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        { isOpen && 
          <div className="dropdown-menu" style={{display: 'block'}}>
            <div className="row">
              <div className="col border-right years-range">
                { yearRange.map((item, index) => 
                  <a role="button" key={index} 
                    className={(item === selectedYear ? 'dropdown-item active text-white' : 'dropdown-item')}
                    onClick={(event) => this.selectYear(event, item)}
                  >{item}年</a>
                ) }
              </div>
              <div className="col month-range">
                { monthRange.map((item, index) => 
                  <a role="button" key={index} 
                    onClick={(event) => this.selectMonth(event, item)}
                    className={(item === selectedMonth ? 'dropdown-item active text-white' : 'dropdown-item')}
                  >{padLeft(item)}月</a>
                ) }
              </div>
            </div>
          </div>
        }
      </div>
    )
  } // render
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MonthPicker