import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { postAdded } from './postsSlice'

export const AddNewPost = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChange = (event) => setTitle(event.target.value)

  const onContentChange = (event) => setContent(event.target.value)

  const onPostSave = (event) => {
    event.preventDefault()

    if (title && content) {
      dispatch(postAdded({ id: nanoid(), title, content }))
      setTitle('')
      setContent('')
    }
  }
  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onPostSave}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTItle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
