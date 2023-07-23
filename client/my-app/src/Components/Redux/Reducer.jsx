let initialData = {
  data: [],
  allData: []
};

// const myReducer = (state = initialData,action) => {

//     if (action.type === "DATA"){
//         return (state = {
//             ...state,
//             data:action.payload,
//         })
//     } else if (action.type==="ALLDATA"){
//         return (state = {
//             ...state,
//             allData:action.payload,
//         })
//     }

//     return state
// };


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
       
        default:
            return state;
        }
    };
    
    export default myReducer;