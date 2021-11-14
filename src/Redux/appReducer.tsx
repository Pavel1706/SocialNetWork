import React from 'react';
import {AppThunk} from "./reduxStore";
import {getAuthTC} from "./authReducer";


let initialState: InitialStateType = {
    initialized: true,

}



export type InitialStateType = {
    initialized: boolean,


}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-INITIALIZED': {

            return {
                ...state,
                initialized:true
            }
        }
        default:
            return state
    }
}


export const intializedSuccess = () =>  ({type: 'SET-INITIALIZED'} as const)



export const initializeTC = ():AppThunk =>  (dispatch) => {
    let promise = dispatch(getAuthTC())
        Promise.all([promise])
            .then(()=>{
       dispatch(intializedSuccess())
   })
        }


type setInitializedACType = ReturnType<typeof intializedSuccess>


export  type ActionsType = setInitializedACType
