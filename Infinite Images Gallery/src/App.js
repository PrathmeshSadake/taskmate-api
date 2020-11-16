import React, { useEffect, useState }from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

 const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(()=>{
   getPhotos();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function getPhotos(){
    let apiUrl = `https://api.unsplash.com/photos?`;
    if(query) apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;
    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`; 

    fetch(apiUrl)
    .then((res)=>res.json())
    .then((data)=>{
      // data.results is response from query search and data from normal api url
    const imagesFromApi = data.results ?? data;
    if(page===1) setImages(imagesFromApi);
    setImages(images => [...images, ...imagesFromApi])});
  }

  
  function handleSearchSubmit(e){
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

// return error if there is not access key
if(!accessKey){
  return(
    <a href="https://unsplash.com/developers"
    className="error">
      Required : Get your Unsplash Access key
    </a>
  )
}

  return (
    <div className="app">
      <h1>Unsplash Image Gallery</h1>

      <form onSubmit={handleSearchSubmit} >
        <input type="text" placeholder="Search Unsplash" onChange={(e)=> setQuery(e.target.value)} value={query} />
        <button>Search</button>
      </form>

      <InfiniteScroll
  dataLength={images.length} //This is important field to render the next data
  next={() => setPage((page)=>page + 1)}
  hasMore={true}
  loader={<div class="loadingio-spinner-dual-ball-qzyrhcp5lv"><div class="ldio-vhscsd1w65a">
  <div></div><div></div><div></div>
  </div></div>
  }
  >
      <div className="image-grid">
        {images.map((image, index) => (
          <a className="image" key={index} href="image.links.html" target="_blank" rel="noopener noreferrer" >
            <img src={image.urls.regular} alt={image.alt_description} />
          </a>
        ))}
      </div>
      </InfiniteScroll>
    </div>
  );
}
