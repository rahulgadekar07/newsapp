import React, { Component } from 'react'
import loading from 'D:/React Tutorial/newsapp/src/Spinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading..."/>
      </div>
    )
  }
}

export default Spinner
