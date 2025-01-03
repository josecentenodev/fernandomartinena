import { type Post } from '@/types/post'
import React from 'react'

const PostCard = ({ post }: { post: Post}) => {
  return (
    <div>Post</div>
  )
}

export default PostCard

export const FullWidthPost = ({ post } : {post: Post}) => {

    return <div>Post Grande</div>
}