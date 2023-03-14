import React, { useState } from 'react';

const CommentForm = () => {
  const [commentText, setCommentText] = useState('');
  // @ts-ignore
  const handleChange = (event) => {
    setCommentText(event.target.value);
  };
  // @ts-ignore
  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: commentText,
        // @ts-ignore
      writer: user_id,
        // @ts-ignore
      postId: props.placeId,
    }
      // @ts-ignore
    axios.post('/api/comment/saveComment', variables)
      // @ts-ignore
      .then(response => {
        if (response.data.success) {
          
        } else {
          alert('Failed to save Comment');
        }
      })
  };


  return (
    <div>
      <br />
      <h3>Comments</h3>
      <br />
      {/* Comment Lists */}

      {/* Comment Form */}
    
      <form onSubmit={onSubmit}>
        <div className="w-200 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" 
                  // @ts-ignore
                rows="4" onChange={handleChange}  value={Comment} 
                
                className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Post comment
                </button>
            </div>
        </div>
      </form>
    
    </div>
  );
};

export default CommentForm;
