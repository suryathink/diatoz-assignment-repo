import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaBookmark, FaCloudDownloadAlt } from "react-icons/fa";
import {useDispatch ,useSelector} from 'react-redux'
import {myActionData,myActionAllData} from "./Redux/Action"
// https://pantyhose-dugong.cyclic.app/getallData
const Home = () => {
  const itemsPerPage = 10;
  const apiUrl = "https://pantyhose-dugong.cyclic.app/getImages";

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [endOfPage, setEndOfPage] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [opacityState, setOpacityState] = useState(-1);
  const [allData, setAllData] = useState([]);
  
  const dispatch = useDispatch();
  // getting data from redux store
  const storeData = useSelector((state) => state.data);
  console.log("Store Data", storeData)
  const allDataFromStore = useSelector((state) => state.allData);
  // const storeData = useSelector((data)=>data.data) 
   console.log("allDataFromStore", allDataFromStore)

  
  const fetchData = async (page) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          page: page,
          itemsperpage: itemsPerPage,
        }),
      });

      const jsonData = await response.json();
       console.log("jsonData",jsonData)
      if (jsonData.length > 0) {
        // Adding new data to the existing previous data
        setData((prevData) => [...prevData, ...jsonData]);
        setCurrentPage(page);
        myActionData(jsonData, dispatch);
      } else {
        // No more data available
        setEndOfPage(true);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  // Function To get All Data

  const allDataMethod = async () =>{
    try {
      const data = await fetch (`https://pantyhose-dugong.cyclic.app/getallData`)
      const jsonData = await data.json();
      console.log(jsonData);
      setAllData(jsonData)
      myActionAllData(jsonData, dispatch);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Attach event listener for scrolling when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial load of data
  useEffect(() => {
    if (storeData.length === 0){
      fetchData(currentPage);
      allDataMethod();
    } else{
      // const storeData = useSelector((state) => state.data);
      setData(storeData)
      setCurrentPage(storeData.length/10)
      setLoading(false)
      setAllData(allDataFromStore)
    }
  }, []);

  // Function to add an image to favorites
  const addToFavorites = async (favID) => {
    try {
      const token = localStorage.getItem("token"); // Replace 'token' with the key used to store the token in localStorage.

      const response = await fetch(
        "https://pantyhose-dugong.cyclic.app/favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header.
          },
          body: JSON.stringify({ favID }), // Send the 'id' to the backend in the request body.
        }
      );

      const data = await response.json();
      console.log('Response from backend:', data);
      toast.success(data.message);
    } catch (error) {
      // console.error('Error adding to favorites:', error);
      toast.error("Adding to Bookmarks Failed");
      // Handle errors that might occur during the POST request.
      // For example, you can show an error message to the user.
    }
  };

  return (
    <div style={styles.container}>
      {/* Display the paginated items */}
      <div style={styles.imageContainer}>
        {data?.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => {
              setOpacityState(i);
            }}
            onMouseLeave={() => {
              setOpacityState(-1);
            }}
            style={styles.imageWrapper}
          >
            <img src={item.download_url} alt="" style={styles.image} />
          

            <div
              style={{ ...styles.overlay, opacity: opacityState == i ? 1 : 0 }}
            >
              <p style={{marginBottom:"0px"}}>{item.author}</p>
              <div style={{ display: "flex",  color: "white" }}>
                <button
                  onClick={() => {
                    addToFavorites(item._id);
                  }}
                >
                  <FaBookmark />
                  {/* Bookmark */}
                </button>&nbsp;&nbsp;&nbsp;
                <button>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href={item.download_url}
                    download={item.author}
                  >
                    <FaCloudDownloadAlt />
                    {/* Download */}
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Showing a loading indicator while fetching data */}
      {loading && (
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "1%",
            borderRadius: "10px",
            marginTop: "2%",
          }}
        >
          Loading...
        </div>
      )}

      {/* Showing a message when there's no more data */}
      {endOfPage && <div>No more images to load.</div>}

      {/* Load More button */}
      {!loading && !endOfPage && (
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "1%",
            borderRadius: "10px",
            marginTop: "2%",
          }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    paddingTop: "80px"
  },
  imageContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridGap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    transition: "opacity 0.2s ease",
    borderRadius: "8px",
    color: "white",
    padding: "10px 10px",
    // cursor:"pointer"
  },
  overlayContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  authorLabel: {
    marginBottom: "10px",
  },
  options: {
    display: "flex",
  },
  favoriteButton: {
    marginRight: "10px",
    backgroundColor: "red",
    color: "red",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  downloadButton: {
    backgroundColor: "red",
    color: "red",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Home;
