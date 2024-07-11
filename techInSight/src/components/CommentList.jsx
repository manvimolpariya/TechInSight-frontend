import React from 'react'
import Comment from './Comment'

const CommentList = ({comments}) => {
    return (
        <div>
          {(comments.length === 0) ? (<p className='font-[500]'>No Comment posted yet.</p>) : (
            comments.map((comment)=> (
                <Comment key={comment._id} comment={comment}/>
            ))
          )}
        </div>
      )
}

export default CommentList
