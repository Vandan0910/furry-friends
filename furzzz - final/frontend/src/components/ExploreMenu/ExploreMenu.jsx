import React, { useContext } from 'react';
import './ExploreMenu.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const ExploreMenu = ({ category, setCategory }) => {
  const services_list = [
    { menu_name: 'Pet Grooming', menu_image: '/images/grooming.jpg', description: 'Pamper your pets with expert grooming for a clean, happy, and healthy look!', link: '/appointments' },  // Update the link here
    { menu_name: 'Pet Food', menu_image: 'images/food.jpg', description: 'Nutritious and delicious meals to keep your pets healthy and happy!', link: '/petfood' },  // Update the link here
    { menu_name: 'Pet Training', menu_image: 'images/training.jpg', description: 'Effective training videos to help your pets learn, behave, and thrive!', link: '/trainer' },  // Update the link here
    { menu_name: 'PetMatch', menu_image: 'images/petmatch.jpg', description: 'Smart suggestions for your pet, tailored to their breed and needs!', link: '/petmatch' }  // Update the link here
  ];

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Our Excellent Pet Care Services</h1>
      <p className='explore-menu-text'>Choose from our exceptional pet care services, designed to keep your furry friends happy, healthy, and well cared for.</p>
      <div className="explore-menu-list">
        {services_list.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} 
              key={index} 
              className='explore-menu-list-item'
              style={{ minWidth: '200px', maxWidth: '250px', flexGrow: 1, textAlign: 'center' }}
            >
              <img src={item.menu_image} alt={item.menu_name} style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }} />
              <h5 style={{ margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>{item.menu_name}</h5>
              <p style={{ fontSize: '14px', color: '#747474', minHeight: '40px' }}>{item.description}</p>
              {/* Replace the <a> tag with Link */}
              <Link to={item.link} className='read-more' style={{ textDecoration: 'none', color: 'tomato', fontWeight: 'bold' }}>
                Read More
              </Link>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
