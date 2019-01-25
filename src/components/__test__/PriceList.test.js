import '../../setupTests'
import React from 'react'
import { shallow } from 'enzyme'
import PriceList from '../PriceList'
import Ionicon from 'react-ionicons'
import { items, categoies } from '../../data'

const itemWithCategory = items.map(item => {
	item.category = categoies[item.cid]
	return item
})

const props = {
	items: itemWithCategory,
	onModifyItem: jest.fn(),
	onDeleteItem: jest.fn(),
}

let wrapper
describe('test PriceList component', () => {
	beforeEach(() => {
		wrapper = shallow(<PriceList {...props} />)
	})
	it('should render the component to match snapshot', () => {
		expect(wrapper).toMatchSnapshot()
	})
	it('should render correct price items length', () => {
		expect(wrapper.find('.list-group-item').length).toEqual(itemWithCategory.length)
	})
	it('should render correct icon and price for each item', () => {
		const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
		expect(iconList.length).toEqual(3)
		expect(iconList.first().props().icon).toEqual(itemWithCategory[0].category.iconName)
	})
	it('should trigger the correct function callbacks', () => {
		const firstItem = wrapper.find('.list-group-item').first()
		firstItem.find('a').first().simulate('click')
		expect(props.onModifyItem).toHaveBeenCalledWith(itemWithCategory[0])
		firstItem.find('a').last().simulate('click')
		expect(props.onDeleteItem).toHaveBeenCalledWith(itemWithCategory[0])
	})
})