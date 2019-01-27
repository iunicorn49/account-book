import '../../setupTests'
import React from 'react'
import { shallow, mount } from 'enzyme'
import CategorySelect from '../CategorySelect'
import Ionicon from 'react-ionicons'

export const categories = [
  {
   "id": "1",
   "name": "旅行",
   "type": "outcome",
   "iconName": "ios-plane",    
 },
  {
   "id": "2",
   "name": "理财",
   "type": "income",
   "iconName": "logo-yen", 
 },
 {
   "id": "3",
   "name": "理财",
   "type": "income",
   "iconName": "logo-yen", 
 }
]

let props = {
 categories,
 onSelectCategory: jest.fn()
}

let props_with_category = {
 categories,
 onSelectCategory: jest.fn(),
 selectedCategory: categories[0],
}


describe('测试类型选择器', () => {
  it('类型选择器渲染', () => {
    const wrapper = shallow(<CategorySelect {...props} />)
    expect(wrapper.find('.category-item').length).toEqual(categories.length)
    expect(wrapper.find('.category-item.active').length).toEqual(0)
    const firstIcon = wrapper.find('.category-item').first().find(Ionicon)
    expect(firstIcon.props().icon).toEqual(categories[0].iconName)
  })
  it('选择图标高亮', () => {
    const wrapper = shallow(<CategorySelect {...props_with_category} />)
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
  })
  it('点击切换高亮', () => {
    const wrapper = shallow(<CategorySelect {...props_with_category} />)
    /** 点击第二项, 使其active, 让第一项失去active */
    wrapper.find('.category-item').at(1).simulate('click', { preventDefault: () => {} })
    expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true)
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false)
    expect(props_with_category.onSelectCategory).toHaveBeenCalledWith(categories[1])
  })
})