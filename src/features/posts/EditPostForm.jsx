import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated, selectPostById } from './postsSlice'

export const EditPostFrom = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onChangeTitle = (event) => setTitle(event.target.value)

  const onContentChange = (event) => setContent(event.target.value)

  const onSaveEditedPost = (event) => {
    event.preventDefault()

    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSaveEditedPost}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What is on your mind?"
          value={title}
          onChange={onChangeTitle}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
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
