import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

class CategorySelect extends Component {
  constructor(props) {
    super(props)
  }
  selectCategory = (event, category) => {
    this.props.onSelectCategory(category)
    event.preventDefault()
  }
  render() {
    const { categories, selectedCategory } = this.props
    const selectedCategoryId = selectedCategory && selectedCategory.id
    return (
      <div className="category-select-component">
        <div className="row">
        {
          categories.map((category, index) => {
            const activeClassName = (selectedCategoryId === category.id)
            ? 'category-item col-3 active' : 'category-item col-3'
            return (
              <div className={activeClassName} role="button"
                onClick={(event) => {this.selectCategory(event, category)}}
              key={index}>
                <Ionicon 
                  className="rounded-circle"
                  fontSize="50px"
                  color="#555"
                  icon={category.iconName}
                />
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default CategorySelect