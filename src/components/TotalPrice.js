import React from 'react'
import PropTypes from 'prop-types'

const TotalPrice = ({ income, outcome }) => (
	<div className="d-flex justify-content-between align-items-center">
		<span className="col-3">支出:&nbsp;{outcome}</span>
		<span className="col-3">支出:&nbsp;{income}</span>
	</div>
)

TotalPrice.propTypes = {
	outcome: PropTypes.number.isRequired,
	income: PropTypes.number.isRequired,
}
TotalPrice.defaultProps = {
	outcome: 0,
	income: 0
}

export default TotalPrice