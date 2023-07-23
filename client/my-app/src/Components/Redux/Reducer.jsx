let initialData = {
  data: [],
  allData: [], 
  user: [], 
};




const myReducer = (state = initialData, action) => {
  switch (action.type) {
    case "DATA":
        return {
            ...state,
        data: [...state.data, ...action.payload],
    };
    case "ALLDATA":
        return {
            ...state,
            allData: action.payload,
        };
    case "USER":
        return {
            ...state,
            user: action.payload,
        };
       
        default:
            return state;
        }
    };
    
    export default myReducer;