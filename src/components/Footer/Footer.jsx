import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section style={{background:'rgba(255,255,255,0.85)',borderTop:'1px solid #e0e7ef',boxShadow:'0 -2px 12px 0 rgba(31,38,135,0.10)',padding:'2rem 0',marginTop:48}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <Logo width="110px" />
          <p style={{color:'#64748b',fontWeight:500,margin:0}}>&copy; {new Date().getFullYear()} All Rights Reserved by DevUI.</p>
        </div>
        <div>
          <h3 style={{fontSize:14,color:'#64748b',fontWeight:700,marginBottom:8}}>Company</h3>
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',gap:24}}>
            <li><Link to="/" style={{color:'#1e293b',textDecoration:'none',fontWeight:600}}>Features</Link></li>
            <li><Link to="/" style={{color:'#1e293b',textDecoration:'none',fontWeight:600}}>Pricing</Link></li>
            <li><Link to="/" style={{color:'#1e293b',textDecoration:'none',fontWeight:600}}>Blog</Link></li>
            <li><Link to="/" style={{color:'#1e293b',textDecoration:'none',fontWeight:600}}>About</Link></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Footer