'use client';
import React, { useState } from 'react'
import './footer.css'
import CreateArticle from '../form/CreateArticle'
import { useSession } from 'next-auth/react'

function Footer() {
  const { data: session } = useSession();
    const [ showModal, setShowModal ] = useState(false);
  return (
    <div className='footer'>
        <div className='footer_logo'>
            <h2>APP: Not Another Article 🤦‍♂️</h2>
        </div>
        <div className='footer_buttons'>
          {session && session.user && session.user.role === "Tutor" || session && session.user && session.user.role === "Admin" 
          ? <button onClick={() => setShowModal(true)} className="footer_buttons_add-article">+</button>
          : null}
        </div>
        { showModal ? <CreateArticle setShowModal={setShowModal}/> : null }      
    </div>
  )
}

export default Footer
