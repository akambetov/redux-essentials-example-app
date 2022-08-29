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

const MemoPostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
  const dispatch = useDispatch()
  const postsStataus = useSelector((state) => state.posts.receivedPosts.status)
  const postsError = useSelector((state) => state.posts.receivedPosts.error)
  const posts = useSelector(selectAllPosts)
  const usersStataus = useSelector((state) => state.users.status)

  let content

  if (postsStataus === LOADING) {
    content = <Spinner text="loading..." />
  } else if (postsStataus === SUCCEEDED) {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <MemoPostExcerpt key={post.id} post={post} />
    ))
  } else if (postsStataus === FAILED) {
    content = <div>{postsError}</div>
  }

  useEffect(() => {
    postsStataus === IDLE && dispatch(fetchPosts())
  }, [dispatch, postsStataus, usersStataus])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
