import React ,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux'
import { FaBookmark, FaCloudDownloadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Favorites = () => {

  const token  = localStorage.getItem('token')

  const navigate = useNavigate();
  const [favoriteData,setFavoriteData] = useState([])
  const [allData,setallData] = useState([])
  const [loading,setLoading] = useState(false)
  const [opacityState, setOpacityState] = useState(-1);

  const dispatch = useDispatch();
  // getting data from redux store

  const AllDataFromRedux = useSelector((state) => state.allData);

   const filteredData = AllDataFromRedux.filter((e,i)=>{
      if (favoriteData.includes(e._id)){
        return e
      }
   })
     
  const fetchFavoriteDataArray = async (token) => {
    setLoading(true);
    try {
       const apiUrl = `https://pantyhose-dugong.cyclic.app/getfavoritedata`
       const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();
       setFavoriteData(jsonData.user.favorites)
    
    } catch (error) {
      console.error('Error fetching data:', error);
   
    }finally{

      setLoading(false);
    }
  };
    


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

    if (!response.ok) {
      throw new Error("Adding to favorites failed"); // Throw an error for non-2xx status codes
    }


    const data = await response.json();
  
    toast.success(data.message);
    
    fetchFavoriteDataArray(token)

  } catch (error) {

    toast.error("Adding to Bookmarks Failed");
    // Handle errors that might occur during the POST request.
    // For example, you can show an error message to the user.
  }
};

const handleAddToFavorites = (favID) => {
  addToFavorites(favID);
};

useEffect(()=>{
  fetchFavoriteDataArray(token)
 },[token])
  return (
    <div style={styles.container}>
    <h2>Favorite Page</h2>
    <br/>
     {
      filteredData.length > 0 ? (
      <div style={styles.imageContainer}>
        {
          filteredData?.map((item, i) => (
          <div
            key={item.id}
            onMouseEnter={() => {
              setOpacityState(i);
            }}
            onMouseLeave={() => {
              setOpacityState(-1);
            }}
            style={styles.imageWrapper}
          >
            <img src={item.download_url} alt="Image" style={styles.image} />
            

            <div
              style={{ ...styles.overlay, opacity: opacityState == i ? 1 : 0 }}
            >
              <p style={{marginBottom:"0px"}}>{item.author}</p>
              <div style={{ display: "flex",  color: "white" }}>
                <button
                  onClick={() => {
                    handleAddToFavorites(item._id);
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
        ))
         
        }
      </div>) : (<h6>No Favorites Data Present</h6>)
     }
    
     
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


export default Favorites
