import React, { useEffect, useState } from 'react'

import '../styles/home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

   const [popularStories, setPopularStories] = useState([]);

   const [searchStories, setSearchStories] = useState([]);

   const [searchQuery, setSearchQuery] = useState('');

  const handleSeachChange = async(e)=>{
    setSearchQuery(e.target.value);

    await axios.get(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`).then(
      (response)=>{
        setSearchStories(response.data.hits);
        console.log(response.data.hits);
      }
    )
  }

   const popularStoriesURL = "http://hn.algolia.com/api/v1/search?tags=front_page";

   const fetchPopularStories = async() =>{
      await axios.get(popularStoriesURL).then(
        (response)=>{
          console.log(response.data.hits);
          setPopularStories(response.data.hits);
        }
      )
   }
      

   useEffect(()=>{
    fetchPopularStories();
   },[])

  return (
    <div className="homePage">

        <nav>
          <h3>NewsWave</h3>
        </nav>
          <div className="home-search">
            <h4>Search....</h4>
            <input type="text" placeholder='Enter something to search..' onChange={(e)=>handleSeachChange(e)} />
            
            {searchQuery === '' ?
            <p>Type something to get search results (eg: science, weather, etc.,)</p>
            :
            <p>Showing search results for: {searchQuery}</p>
            
            }
          </div>

          {searchQuery === '' ?
          
                <div className="home-body">
                    
                    <h4>Latest Stories</h4>
                    {popularStories.length === 0 ?
                    <div class="spinner-border text-secondary  loading-spinner" role="status"><span class="visually-hidden">Loading...</span></div>
                    :
                    ""}
                    <div className="home-articles">

                      {popularStories.map((story, index)=>(

                        <div className="home-article" key={index}>
                            <div>
                              <h5>{story.title.length > 70 ? story.title.slice(0,70) + '....' : story.title}</h5>
                              <p><b>Author:</b> {story.author}</p>
                            </div>
                            <span>
                              <p>{Date(story.created_at).slice(0,16)}</p>
                              <button onClick={()=> navigate(`/post/${story.objectID}`)} >View story</button>
                            </span>
                        </div>
                      ))}

                        {/* Add navigate to top button */}

                    </div>
                </div>
          :
          
                <div className="home-body">
                    <h4>Search Results</h4>
                    {searchStories.length === 0 ?
                    <div class="spinner-border text-secondary loading-spinner" role="status"><span class="visually-hidden">Loading...</span></div>
                    :
                    ""} 
                    {searchStories.length > 0 ?
                        <div className="home-articles">

                          {searchStories.map((story, index)=>(

                            <div className="home-article" key={index}>
                                <div>
                                  <h5>{story.title}</h5>
                                  <p><b>Author:</b> {story.author}</p>
                                </div>
                                <span>
                                  <p>{Date(story.created_at).slice(0,16)}</p>
                                  <button onClick={()=> navigate(`/post/${story.objectID}`)} >View story</button>
                                </span>
                            </div>
                          ))}

                        </div>
                    
                    :
                    
                    ""}

                </div>
          
          }




    </div>
  )
}

export default Home