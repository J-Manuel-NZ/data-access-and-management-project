'use client';
import React, { useState } from 'react'
import './footer.css'
import CreateArticle from '../form/CreateArticle'

function Footer() {
    const [ showModal, setShowModal ] = useState(false);
  return (
    <div className='footer'>
        <div className='footer_logo'>
            <h2>APP: Not Another Article 🤦‍♂️</h2>
        </div>
        <div className='footer_buttons'>
            <button onClick={() => setShowModal(true)} className="footer_buttons_add-article">+</button>
        </div>
        { showModal ? <CreateArticle setShowModal={setShowModal}/> : null }      
    </div>
  )
}

export default Footer
