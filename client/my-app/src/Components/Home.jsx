


import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Home = () => {
  const itemsPerPage = 10;
  const apiUrl = 'http://localhost:8080/getImages';

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [endOfPage, setEndOfPage] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [opacityState,setOpacityState] = useState(-1)

  // const fetchData = async (page) => {
  //   try {
  //     const response = await fetch(`${apiUrl}?page=${page}&itemsperpage=${itemsPerPage}`);
  //     const jsonData = await response.json();

  //     if (jsonData.length > 0) {
  //       // Adding new data to the existing previous data
  //       setData((prevData) => [...prevData, ...jsonData]);
  //       setCurrentPage(page);
  //     } else {
  //       // No more data available
  //       setEndOfPage(true);
  //     }

  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setLoading(false);
  //   }
  // };

  const fetchData = async (page) => {
    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch(apiUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          page: page,
          itemsperpage: itemsPerPage,
        }),
      });

      const jsonData = await response.json();

      if (jsonData.length > 0) {
        // Adding new data to the existing previous data
        setData((prevData) => [...prevData, ...jsonData]);
        setCurrentPage(page);
      } else {
        // No more data available
        setEndOfPage(true);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (!loading && !endOfPage && page >= 1 && page !== currentPage) {
      setLoading(true);
      fetchData(page);
    }
  };

  // Load more images when the user reaches the end of the page
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      handlePageChange(currentPage + 1);
    }
  };

  //  function download(download_url){
  //   axios({
  //                 url:{download_url},
  //                 method:'GET',
  //                 responseType: 'blob'
  //         })
  //         .then((response) => {
  //                const url = window.URL
  //                .createObjectURL(new Blob([response.data]));
  //                       const link = document.createElement('a');
  //                       link.href = url;
  //                       link.setAttribute('download', 'image.jpg');
  //                       document.body.appendChild(link);
  //                       link.click();
  //         })
  //         }
    
    

  // Attach event listener for scrolling when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial load of data
  useEffect(() => {
    fetchData(currentPage);
  }, []);

  // Function to add an image to favorites
  const addToFavorites = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Replace 'token' with the key used to store the token in localStorage.
  
      const response = await fetch('http://localhost:8080/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header.
        },
        body: JSON.stringify({ id }), // Send the 'id' to the backend in the request body.
      });
  
      const data = await response.json();
      // console.log('Response from backend:', data);
      toast.success(data.message)
      
    } catch (error) {
      // console.error('Error adding to favorites:', error);
      toast.error("Adding to Bookmarks Failed")
      // Handle errors that might occur during the POST request.
      // For example, you can show an error message to the user.
    }

  };



  return (
    <div style={styles.container}>
    {/* Display the paginated items */}
    <div style={styles.imageContainer}>
      {data?.map((item,i) => (
        <div key={item.id}
         onMouseEnter={()=>{setOpacityState(i)}} 
         onMouseLeave={()=>{setOpacityState(-1)}}
          style={styles.imageWrapper}>
          <img src={item.download_url} alt="" style={styles.image} />
          {/* <div style={styles.overlay}>
            <div style={styles.overlayContent}>
              <p style={styles.authorLabel}>Author: {item.author}</p>
              <div style={styles.options}>
                {!isInFavorites(item._id) ? (
                  <button
                    onClick={() => addToFavorites(item._id)}
                    style={styles.favoriteButton}
                  >
                    <i className="far fa-heart"></i> Add to Favorites
                  </button>
                ) : (
                  <button style={styles.favoriteButton} disabled>
                    <i className="fas fa-heart"></i> Added to Favorites
                  </button>
                )}
                <button style={styles.downloadButton}>Download</button>
              </div>
            </div>
          </div> */}

          <div style={{...styles.overlay,opacity:opacityState == i ? 1 :0} }>
            <p>{item.author}</p>
         <div style={{display:"flex",gap:"10px",color:"white"}} >
            <button onClick={()=>{addToFavorites(item._id)}}>
            <i class="fa-regular fa-star"></i>
            Bookmark
            </button>
            <button>
            <a style={{textDecoration:"none",color:"white"}} href={item.download_url} download={item.author}>  
            <i class="fa-solid fa-cloud-arrow-down"></i>
            Download
            </a>
          </button>
         </div>
          </div>
        </div>
      ))}
    </div>

    {/* Showing a loading indicator while fetching data */}
    {loading && <div style={{backgroundColor:"black",color:"white",padding:"1%",borderRadius:"10px",marginTop:"2%"}}>Loading...</div>}

    {/* Showing a message when there's no more data */}
    {endOfPage && <div>No more images to load.</div>}

    {/* Load More button */}
    {!loading && !endOfPage && (
      <button style={{backgroundColor:"black",color:"white",padding:"1%",borderRadius:"10px",marginTop:"2%"}} onClick={() => handlePageChange(currentPage + 1)}>Load More</button>
    )}
  </div>
);
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:"30px"
  },
  imageContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 'auto', 
    borderRadius: '8px',
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    transition: 'opacity 0.2s ease',
    borderRadius: '8px',
    color: 'white',
    padding:"10px 10px",
    // cursor:"pointer"

  },
  overlayContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  authorLabel: {
    marginBottom: '10px',
  },
  options: {
    display: 'flex',
  },
  favoriteButton: {
    marginRight: '10px',
    backgroundColor: 'red',
    color: 'red',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  downloadButton: {
    backgroundColor: 'red',
    color: 'red',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Home;


