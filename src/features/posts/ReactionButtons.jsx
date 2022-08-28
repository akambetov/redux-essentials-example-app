import React from 'react'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button key={name} type="button" className="muted-button reaction-button">
      {emoji} {post?.reactionButtons?.[name]}
    </button>
  ))

  return <div>{reactionButtons}</div>
}
