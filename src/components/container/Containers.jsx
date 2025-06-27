import React from 'react'

function Containers({children}) {
  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'2rem',background:'rgba(255,255,255,0.85)',borderRadius:24,boxShadow:'0 4px 24px 0 rgba(31,38,135,0.13)',border:'1px solid #e0e7ef'}}>{children}</div>
  );
}

export default Containers
