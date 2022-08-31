import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { useGetPostQuery } from '../api/apiSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId)

  let content
  if (isFetching) {
    content = <Spinner text="loading" />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/edit/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  } else if (isError) {
    content = (
      <>
        <h2>Post not found!</h2>
        <p>{error.error}</p>
      </>
    )
  }

  return <section>{content}</section>
}
