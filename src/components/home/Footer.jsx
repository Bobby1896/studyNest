import React from 'react'
import Logo from '../Logo'
import { Link } from 'react-router'
import Icon from '../Icon'

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer>
        <div className="container">
            <div className='footer-content-wrapper logo-link'>
                <Logo/>

                <div className='footer-link'>
                    <Link to="/sign-up">Get Started</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>

            <div className="footer-content-wrapper">
                <div>
                    &copy; {currentYear}. All Right Reserved
                </div>

                <div className="icon-wrapper">
                    <div className="icon">
                        <Icon icon="fb" />
                    </div>
                    <div className="icon">
                        <Icon icon="x" />
                    </div>
                    <div className="icon">
                        <Icon icon="insta" />
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer