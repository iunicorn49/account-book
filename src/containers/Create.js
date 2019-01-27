import React from 'react'

const Create = ({match}) => {
  return <h1>第二个页面 {match.params.id}</h1>
}

export default Create