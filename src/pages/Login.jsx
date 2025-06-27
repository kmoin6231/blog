import React from 'react'
import { Login as loginComponent } from '../components'

function Login() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 60% 40%, #f472b6 0%, #6366f1 40%, #1e293b 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{position:'absolute',top:0,left:0,width:400,height:400,background:'linear-gradient(135deg,#f472b6,#6366f1)',opacity:0.12,borderRadius:'50%',filter:'blur(120px)',zIndex:0,animation:'float1 8s ease-in-out infinite'}} />
      <div style={{position:'absolute',bottom:0,right:0,width:320,height:320,background:'linear-gradient(135deg,#6366f1,#f472b6)',opacity:0.10,borderRadius:'50%',filter:'blur(100px)',zIndex:0,animation:'float2 10s ease-in-out infinite'}} />
      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-30px);} }
        @keyframes float2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(30px);} }
      `}</style>
      <loginComponent />
    </div>
  )
}

export default Login