import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { useGetPostsQuery } from '../api/apiSlice'

const PostExcerpt = ({ post }) => {
  return (
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
}

export const PostsList = () => {
  const {
    data: posts = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="loading..." />
  } else if (isSuccess) {
    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    })

    content = (
      <div className={containerClassname}>
        {sortedPosts.map((post) => (
          <PostExcerpt key={post.id} post={post} />
        ))}
      </div>
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}
