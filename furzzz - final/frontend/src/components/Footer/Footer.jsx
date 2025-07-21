import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>"Reach out to us for all your pet care needs – we’re here to help! "</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Furzz</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 8898642844</li>
                <li>Shop No 9 Modi Spaces, Shimpoli Road, Mumbai - 400092</li>
                <li>FurryFriends20112022@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© Furzzz.com. All Rights Reserved.</p>
    </div>
  )
}

export default Footer
