import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentForm = (props) => {
  const [CommentText, setCommentText] = useState("");
  const [Comments, setComments] = useState([]);
  
  // @ts-ignore

  useEffect(() => {
    
    fetchComments();

  }, []);
    
    let variable = {
      post_id: Date.now(),
      commentText: CommentText,
    };

    const fetchComments = () => {
      axios.post("/api/comment/getComments", variable)
        .then(response => {
          if (response.data.success) {
            setComments(response.data.comments);
          } else {
            alert("Failed to get comments");
          }
      })
    }
  

  // @ts-ignore
  const onSubmit = (event) => {
    //set the variable
    event.preventDefault();
    
    let commentPost = {
      post_id: Date.now(),
      commentText: CommentText,
    };

    try {
      console.log("commentPost", commentPost);
      axios.post("/api/comment/createComment", commentPost).then((response) => {
        if (response.data.success) {
          setComments(response.data.comments);
          setCommentText("");
        } else {
          alert("Failed to save Comment");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container">
      <br />
      <h3>Comments</h3>
      <br />
      {Comments.map((comment, index) => {
        return Comments < 0 ? 
        (
          <div key={index} className="my-4">
            <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
  
            <li className="m-4">{comment.commentText[0]}</li>
            </ul>
          </div>
      ) : (
      
          <div key={index} className="my-4">
            <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
  
            <li className="m-4">{comment.commentText}</li>
            </ul>
          </div>
        ) 
        })}
  
  


      
      <form onSubmit={onSubmit}>
        <div className="w-200 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-dark rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
