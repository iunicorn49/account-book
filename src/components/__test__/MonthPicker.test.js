import '../../setupTests'
import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import MonthPicker from '../MonthPicker'

let props = {
  year: 2019,
  month: 1,
  onChange: jest.fn()
}

let wrapper

describe('测试月份组件', () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />)
  })
  it('dom结构是否变更', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('是否正确的渲染年份和月份, 下拉菜单一开始不出现', () => {
    const text = wrapper.find('.dropdown-toggle').text()
    expect(text).toEqual('2019年 01月')
    expect(wrapper.find('.dropdown-menu').length).toEqual(0)
    expect(wrapper.state('isOpen')).toEqual(false)
    expect(wrapper.state('selectedYear')).toEqual(props.year)
  })
  it('点击按钮以后, 是否正确的渲染下拉菜单', () => {
    wrapper.find('.dropdown-toggle').simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.dropdown-menu').length).toEqual(1)
    expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9)
    expect(wrapper.find('.month-range .dropdown-item').length).toEqual(12)
    expect(wrapper.find('.years-range .dropdown-item.active').text()).toEqual('2019年')
    expect(wrapper.find('.month-range .dropdown-item.active').text()).toEqual('01月')
    /** 查看年份第一项是否正确, 应该是 2019 - 4, 月份第一月是 01月 最后一个是 12月 */
    expect(wrapper.find('.years-range .dropdown-item').first().text()).toEqual(`${props.year - 4}年`)
    expect(wrapper.find('.month-range .dropdown-item').first().text()).toEqual(`01月`)
    expect(wrapper.find('.month-range .dropdown-item').last().text()).toEqual(`12月`)
  })
  it('点击年份或者月份, 应该更改state中对应的值', () => {
    wrapper.find('.dropdown-toggle').simulate('click')
    wrapper.find('.years-range .dropdown-item').first().simulate('click')
    expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active')).toEqual(true)
    expect(wrapper.state('selectedYear')).toEqual(props.year - 4)
    /** 点击月份 */
    wrapper.find('.month-range .dropdown-item').first().simulate('click')
    expect(wrapper.state('selectedMonth')).toEqual(1)
    // expect(wrapper.state('isOpen')).toEqual(false)
    expect(props.onChange).toHaveBeenCalledWith({year: 2019 - 4, month: 1})
  })
  it('点击空白部分关闭下拉菜单', () => {
    let eventMap = {}
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })
    const wrapper = mount(<MonthPicker {...props} />)
    wrapper.find('.dropdown-toggle').simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.dropdown-menu').length).toEqual(1)
    eventMap.click({
      target: ReactDOM.findDOMNode(wrapper.instance())
    })
    expect(wrapper.state('isOpen')).toEqual(true)
    eventMap.click({
      target: document
    })
    expect(wrapper.state('isOpen')).toEqual(false)
  })
})