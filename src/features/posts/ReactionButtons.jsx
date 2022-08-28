import React from 'react'
import { useDispatch } from 'react-redux'

import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const onReactionAdd = (postId, reaction) => () => {
    dispatch(reactionAdded({ postId, reaction }))
  }

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([emojiName, emoji]) => (
      <button
        key={emojiName}
        type="button"
        className="muted-button reaction-button"
        onClick={onReactionAdd(post.id, emojiName)}
      >
        {emoji} {post?.reactions?.[emojiName]}
      </button>
    )
  )

  return <div>{reactionButtons}</div>
}
