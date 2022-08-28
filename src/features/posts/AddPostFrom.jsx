import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Spinner } from '../../components/Spinner'
import { addNewPost } from './postsSlice'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constants'

export const AddNewPost = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.data)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState(IDLE)
  const [error, setError] = useState(null)
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === IDLE

  const onTitleChange = (event) => setTitle(event.target.value)

  const onContentChange = (event) => setContent(event.target.value)

  const onAuthorChange = (event) => setUserId(event.target.value)

  const onPostSave = async (event) => {
    event.preventDefault()

    if (canSave) {
      try {
        setAddRequestStatus(LOADING)
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
        setAddRequestStatus(SUCCEEDED)
      } catch (err) {
        setError(err.message)
        setAddRequestStatus(FAILED)
        console.error('Failed to save the post: ', err)
      } finally {
        setTimeout(() => setAddRequestStatus(IDLE), 2000)
      }
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
      {addRequestStatus === LOADING && <Spinner text="laoding..." />}
      {addRequestStatus === SUCCEEDED && <div>OK</div>}
      {addRequestStatus === FAILED && <div>{error}</div>}
    </section>
  )
}
