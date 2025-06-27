import React from 'react'
import { Containers, PostForm } from '../components'

function AddPost() {
  return (
    <Containers>
      <h1>Create a New Post</h1>
      <p>Share your thoughts and ideas with the universe.</p>
      <PostForm />
    </Containers>
  )
}

export default AddPost