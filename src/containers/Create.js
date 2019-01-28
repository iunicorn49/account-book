import React, { Component, Fragment } from 'react'
import PriceForm from '../components/PriceForm'

class Create extends Component {
  onFormSubmit = () => {

  }
  onCancelSubmit = () => {
    
  }
  render() {
    return (
      <Fragment>
        <PriceForm onFormSubmit={this.onFormSubmit} onCancelSubmit={this.onCancelSubmit} />
      </Fragment>
    )
  }
}

export default Create