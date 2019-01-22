import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
	return (
		<ul className="list-group list-group-flush">
			{
				items.map((item) => (
					<li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
						<span className="col-1">
							<Ionicon
								className="rounded-circle" 
								fontSize="30px" 
								style={{backgroundColor: '#007bff', padding: '5px'}} 
								color="#fff"
								icon={item.category.iconName} 
							/>
						</span>
						<span className="col-5">{item.title}</span>
						<span className="col-2 font-weight-bold">
							{(item.category.type) === 'income' ? '+' : '-'}
							{item.price}元
						</span>
						<span className="col-2">{item.date}</span>
						<a href="#" onClick={() => {onModifyItem(item)}} className="col-1">
							<Ionicon 
								className="rounded-circle" 
								fontSize="30px" 
								style={{backgroundColor: '#28a745', padding: '5px'}} 
								color="#fff" 
								icon="ios-create-outline"
							/>
						</a>
						<a href="#" onClick={() => {onDeleteItem(item)}} className="col-1">
							<Ionicon 
								className="rounded-circle" 
								fontSize="30px" 
								style={{backgroundColor: '#ff5d5d', padding: '5px'}} 
								color="#fff" 
								icon="ios-close"
							/>
						</a>
					</li>
				))
			}
		</ul>
	)
}

PriceList.propTypes = { // 类型检查
	items: PropTypes.array.isRequired,
	onModifyItem: PropTypes.func.isRequired,
	onDeleteItem: PropTypes.func.isRequired,
}
PriceList.defaultProps = { // 默认值
	items: []
}

export default PriceList