import {InitialStateType, UserType} from "../../Redux/usersReducer";

export const updateObjectInArray = (state:InitialStateType, itemId:any, objPropName:any, newObjProps:any)=>{

   return state.users.map(t => {
           if (t['id'] === itemId) {
               return {...t, ...newObjProps}
           }
           return t;
       })

}