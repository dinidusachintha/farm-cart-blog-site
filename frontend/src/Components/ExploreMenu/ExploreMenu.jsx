import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Categories</h1>
      <p className='explore-menu-text'>
        These categories are designed to enrich your farming journey, offering valuable insights and practical tips for both beginners and seasoned farmers alike. Happy exploring!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name))}
              key={index}
              className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
            >
              <img
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt={item.menu_name}  
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
