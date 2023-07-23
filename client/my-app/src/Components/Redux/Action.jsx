
export const myActionData = (data,dispatch) =>{
    dispatch({
     type:"DATA",
     payload:data,
    });
 }
 
export const myActionAllData = (data,dispatch) =>{
    dispatch({
     type:"ALLDATA",
     payload:data,
    });
 }

 
