import '../../setupTests'
import React from 'react'
import { mount } from 'enzyme'
import Home from '../Home'

import { 
	LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME,
	parseToYearAndMonth, padLeft
} from '../../utility.js'
import PriceList from '../../components/PriceList'
import ViewTab from '../../components/ViewTab'
import MonthPicker from '../../components/MonthPicker'
import TotalPrice from '../../components/TotalPrice'
import CreateBtn from '../../components/CreateBtn'

let wrapper

describe('测试Home组件', () => {
  beforeEach(() => {
    wrapper = mount(<Home />)
  })
  it('是否渲染', () => {
    const currentData = parseToYearAndMonth('2019/01/01')
    expect(wrapper.find(PriceList).length).toEqual(1)
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW)
    expect(wrapper.find(MonthPicker).props().year).toEqual(currentData.year)
    expect(wrapper.find(MonthPicker).props().month).toEqual(currentData.month)
    expect(wrapper.find(PriceList).props().items.length).toEqual(0)
  })
  it('测试ViewTab交互', () => {
    wrapper.find('.nav-item a').last().simulate('click')
    expect(wrapper.find('.chart-title').text()).toEqual('图表')
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW)
  })
  it('测试MonthPicker交互', () => {
    wrapper.find('.dropdown-toggle').simulate('click')
    wrapper.find('.month-range .dropdown-item').at(10).simulate('click')
    expect(wrapper.find(MonthPicker).props().month).toEqual(11)
  })
})