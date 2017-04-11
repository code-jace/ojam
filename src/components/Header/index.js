import React from 'react'

export default class Header extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='container'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <a className='navbar-brand' href='#'>MySite</a>

            <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
              <ul className='nav navbar-nav'>
                <li className='active'><a href='#'>Link <span className='sr-only'>(current)</span></a></li>
                <li><a href='#'>Link</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
