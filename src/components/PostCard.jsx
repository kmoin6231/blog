import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} style={{textDecoration:'none'}}>
      <div style={{background:'rgba(255,255,255,0.9)',borderRadius:20,boxShadow:'0 2px 12px 0 rgba(31,38,135,0.10)',border:'1px solid #e0e7ef',padding:'1.5rem',marginBottom:'1.5rem',transition:'box-shadow 0.2s',color:'#1e293b'}}>
        <div style={{width:'100%',height:180,overflow:'hidden',borderRadius:16,marginBottom:16,background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
        </div>
        <h2 style={{fontSize:'1.5rem',fontWeight:700,margin:0}}>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard