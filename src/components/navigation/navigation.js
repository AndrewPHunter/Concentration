import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';

import './navigation.css';

/*
 * Navigation component that handles styling of navigation pane and elements
 */
class Navigation extends Component {

  static propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  /*
   * navigation to selected link and fire link selected action
   */
  onLinkSelected = (pathname)=>{
    this.props.onItemSelected();
    this.props.history.push(pathname);
  };

  /*
   * wrapper for a element to provide consistent style and highlighting when active route
   */
  generateLink = (item)=>{

    const {location} = this.props;

    const itemActiveClass = (location.pathname === item.pathname) ? 'navigation__item--active': '';

    return (
      <li className={`navigation__item ${itemActiveClass}`} key={item.pathname}>
        <a className='navigation__link' onClick={this.onLinkSelected.bind(null, item.pathname)}>
          <Icon icon={item.icon} className='navigation__icon'/>
          <span className='navigation__text'>{item.title}</span>
        </a>
      </li>
    );
  };

  /*
   * Maps each route used in app to link element above
   */
  generateNavLinks = ()=>{

    const links = [
      {pathname: '/', title: 'Play Game', icon:ICONS.OWL},
      {pathname: '/leaderboard', title:'Leader Board', icon: ICONS.USERS},
      {pathname: '/settings', title: 'Settings', icon: ICONS.COG}
    ];

    return links.map(link=>this.generateLink(link));
  };

  render(){
    const {expanded} = this.props;

    return(
      <div className='navigation__container'>
        {expanded &&
          <div className='navigation'>
            <div className="navigation__title">
              <h3>Concentration</h3>
            </div>
            <nav className="navigation__nav">
              <ul className="navigation__list">
                {this.generateNavLinks()}
              </ul>
            </nav>
            <div className="navigation__footer">
              <p className="copy-right">&copy; {(new Date()).getFullYear()} MIT License</p>
            </div>
          </div>
        }
      </div>
    );

  }
}

export default withRouter(Navigation);
