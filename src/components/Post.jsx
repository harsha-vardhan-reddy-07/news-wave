import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/post.css'

const Post = () => {

  const navigate = useNavigate();

  const params = useParams();

  const [postData, setPostData] = useState();

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetchPostData();
  },[])

  const fetchPostData = async()=>{
    await axios.get(`http://hn.algolia.com/api/v1/items/${params['id']}`).then(
      (response)=>{
        console.log(response.data);
        setPostData(response.data);
        setLoading(false);
      }
    )
  }

  return (

      <div className="postPage">

            <div className="postPage-navbar">
              <h3 onClick={()=> navigate('/home')}>NewsWave</h3>
              <p onClick={()=> navigate('/home')}>Home</p>
            </div>

            {loading ?
                <div className="spinner-border text-secondary  post-loading-spinner" role="status"><span className="visually-hidden">Loading...</span></div>
            :
            ""
            }
        {postData && (
            <div className="post-container">

                <div className="post-head">
                  <a className='post-title' href ={postData.url} target="_blank" >{postData.title}</a>
                  <span>
                    <p><b>Author: </b> {postData.author} </p>
                    <p><b>Posted on: </b> { Date(postData.created_at).slice(0,16) } </p>
                  </span>

                 

                </div>

                <h4>Comments ({postData.children.length})</h4>
                <hr />
                <div className="post-comments">


                    {postData.children.map((comment, index)=>(
                      <div className="post-comment">

                        <div className="post-comment-data" key={index}>
                            <span>
                              <h5>{comment.author}</h5>
                              <p>{Date(comment.created_at).slice(0,16)}</p>
                            </span>
                            <p>{comment.text}</p>

                        </div>
                        {comment.children.length > 0 ?

                          <span className='replies-head' >
                              <h4>Replies</h4>
                              <button type="button" data-bs-toggle="collapse" data-bs-target={`#h${index}`} aria-expanded="false" aria-controls={`h${index}`}>
                                View replies
                              </button>
                          </span>
                        :
                        ""}
                        <div className="collapse" id={`h${index}`}>

                            {comment.children.map((subComment, i)=>(
                              <div className="post-sub-comment" key={i}>
                                
                                  <div className="post-sub-comment-data" >
                                      <span>
                                        <h5>{comment.author}</h5>
                                        <p>{Date(comment.created_at).slice(0,16)}</p>
                                      </span>
                                      <p>{comment.text}</p>

                                  </div>
                                  {i === comment.children.length - 1 ?
                                  
                                  ""
                                  :
                                  <hr />
                                  }
                              </div>
                            ))}
                        </div>

                          <hr />
                      </div>
                    ))}


                </div>


            </div>


            )}


      </div>

    
  )
}

export default Post