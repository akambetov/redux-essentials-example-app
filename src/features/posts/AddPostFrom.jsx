import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Spinner } from '../../components/Spinner'
import { addNewPost } from './postsSlice'
import { FAILED, LOADING, SUCCEEDED } from '../../constants'

export const AddNewPost = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.data)
  const addPostStatus = useSelector((state) => state.posts.newPost.status)
  const addPostError = useSelector((state) => state.posts.newPost.error)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const canSave = !!title && !!content && userId

  const onTitleChange = (event) => setTitle(event.target.value)

  const onContentChange = (event) => setContent(event.target.value)

  const onAuthorChange = (event) => setUserId(event.target.value)

  const onPostSave = (event) => {
    event.preventDefault()

    if (canSave) {
      dispatch(addNewPost({ title, content, user: userId }))
      setTitle('')
      setContent('')
      setUserId('')
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onPostSave}>
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value="" />
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
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
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
      {addPostStatus === LOADING && <Spinner text="laoding..." />}
      {addPostStatus === SUCCEEDED && <div>OK</div>}
      {addPostStatus === FAILED && <div>{addPostError}</div>}
    </section>
  )
}
