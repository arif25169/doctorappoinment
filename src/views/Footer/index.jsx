import React from 'react'
import './styles.css'
import { Facebook, Twitter, Youtube, Linkedin } from 'styled-icons/fa-brands'
const Footer = () => {
  return (
    <div>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>Doctor<span>Appoinment</span></h3>
          <p className="footer-links">
            <a href="/#" className="link-1">Home</a>
            <a href="/#">Blog</a>
            <a href="/#">Pricing</a>
            <a href="/#">About</a>
            <a href="/#">Faq</a>
            <a href="/#">Contact</a>
          </p>
          <p className="footer-company-name">Doctor Appoinment © 2020</p>
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker" />
            <p><span>16/C Mouchak</span> Malibag, Dhaka</p>
          </div>
          <div>
            <i className="fa fa-phone" />
            <p>+880171112345678</p>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <p><a href="mailto:support@company.com">support@doctorapp.com</a></p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            Doctor appointment app is the future of modern medicine. It empowers doctors, patients and healthcare enterprises to capitalize on a simple but powerful technological device i.e the smartphone.
    </p>
          <div className="footer-icons" >
            <a href="/#" style={{marginRight:"10px"}}><Facebook /></a>
            <a href="/#" style={{marginRight:"10px"}}><Twitter /></a>
            <a href="/#" style={{marginRight:"10px"}}><Youtube /></a>
            <a href="/#" style={{marginRight:"10px"}}><Linkedin /></a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer
