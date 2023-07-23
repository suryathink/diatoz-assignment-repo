import React ,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux'

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
  // console.log(AllDataFromRedux)

   const filteredData = AllDataFromRedux.filter((e,i)=>{
      if (favoriteData.includes(e._id)){
        return e
      }
   })
     
   console.log("filteredDataObjects",filteredData)
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
      //  console.log("Favorite page data ",jsonData)
       setFavoriteData(jsonData.user.favorites)
       console.log(favoriteData)
       
      
    } catch (error) {
      alert(error)
      console.error('Error fetching data:', error);
   
    }finally{

      setLoading(false);
    }
  };
    

useEffect(()=>{
 fetchFavoriteDataArray(token)
},[])


  return (
    <div style={styles.container}>
    <h2>Favorite Page</h2>
      {/* Display the paginated items */}
      <div style={styles.imageContainer}>
        {filteredData?.map((item, i) => (
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
             
            </div>
          </div>
        ))}
      </div>
     
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