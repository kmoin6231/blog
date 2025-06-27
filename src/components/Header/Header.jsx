import React from 'react'
import {Containers, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header style={{background:'rgba(255,255,255,0.85)',borderBottom:'1px solid #e0e7ef',boxShadow:'0 2px 12px 0 rgba(31,38,135,0.10)',padding:'1.5rem 0',marginBottom:32}}>
      <Containers>
        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <Link to='/'>
              <Logo width='90px' />
            </Link>
          </div>
          <ul style={{display:'flex',gap:24,listStyle:'none',margin:0,padding:0}}>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    style={{background:'#6366f1',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:16,cursor:'pointer',boxShadow:'0 2px 8px 0 #6366f133',transition:'background 0.2s'}}
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn style={{background:'#6366f1',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:16,cursor:'pointer',boxShadow:'0 2px 8px 0 #6366f133',transition:'background 0.2s'}} />
              </li>
            )}
          </ul>
        </nav>
      </Containers>
    </header>
  )
}

export default Header