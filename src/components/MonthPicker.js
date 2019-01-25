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
      isOpen: true,
    })
    this.props.onChange({
      year: this.state.selectedYear,
      month: monthNumber
    })
  }
  render() {
    const { year } = this.props
    const { isOpen, selectedYear, selectedMonth } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(item => item + year)

    return (
      <div className="dropdown month-picker-component">
        <h4>选择月份</h4>
        <button
          onClick={this.toggleDropdown}
          className="btn btn-lg btn-secondary dropdown-toggle"
        >
          {`${selectedYear}年 ${padLeft(selectedMonth)}月`}
        </button>
        { isOpen && 
          <div className="dropdown-menu" style={{display: 'block'}}>
            <div className="row">
              <div className="col border-right">
                { yearRange.map((item, index) => 
                  <a role="button" key={index} 
                    className={(item === selectedYear ? 'dropdown-item active' : 'dropdown-item')}
                    onClick={(event) => this.selectYear(event, item)}
                  >{item}年</a>
                ) }
              </div>
              <div className="col">
                { monthRange.map((item, index) => 
                  <a role="button" key={index} 
                    onClick={(event) => this.selectMonth(event, item)}
                    className={(item === selectedMonth ? 'dropdown-item active' : 'dropdown-item')}
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