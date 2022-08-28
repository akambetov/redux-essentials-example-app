import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { fetchPosts, selectAllPosts } from './postsSlice'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constants'

const PostExcerpt = ({ post }) => (
  <article className="post-excerpt">
    <h3>{post.title}</h3>
    <div>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
    </div>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <ReactionButtons post={post} />
    <Link to={`/posts/${post.id}`} className="button muted-button">
      View Post
    </Link>
  </article>
)

export const PostsList = () => {
  const dispatch = useDispatch()
  const postsStataus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const posts = useSelector(selectAllPosts)

  let content

  if (postsStataus === LOADING) {
    content = <Spinner text="loading..." />
  } else if (postsStataus === SUCCEEDED) {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postsStataus === FAILED) {
    content = <div>{error}</div>
  }

  useEffect(() => {
    postsStataus === IDLE && dispatch(fetchPosts())
  }, [dispatch, postsStataus])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
