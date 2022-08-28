import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { fetchPosts, selectAllPosts } from './postsSlice'
import { IDLE } from '../../constants'

export const PostsList = () => {
  const dispatch = useDispatch()
  const postsStataus = useSelector((state) => state.posts.status)
  const posts = useSelector(selectAllPosts)
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderPosts = (posts) =>
    posts.map((post) => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    ))

  useEffect(() => {
    postsStataus === IDLE && dispatch(fetchPosts())
  }, [dispatch, postsStataus])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderPosts(orderedPosts)}
    </section>
  )
}
