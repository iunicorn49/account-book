import React from 'react'
import PropTypes from 'prop-types'

const TotalPrice = ({ income, outcome }) => (
	<div className="row">
		<div className="col">
			<h5 className="income">收入：<span>{income}</span></h5>
		</div>
		<div className="col">
			<h5 className="outcome">支出：<span>{outcome}</span></h5>
		</div>
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