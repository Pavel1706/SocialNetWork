import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {messageReducer, NewMessageActionType} from "./messageReducer";
import {dialogsReducer, DialogType} from "./dialogsReducer";
import {UsersActionsType, usersReducer} from "./usersReducer";
import {authReducer, LoginActionsType} from "./authReducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import {ActionsType, appReducer} from "./appReducer";

export let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    dialogsPage: dialogsReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType = UsersActionsType | LoginActionsType
    | ProfileActionsType | DialogType | NewMessageActionType |ActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppStateType,unknown,AppActionsType>
//@ts-ignore
window.store = store
// export type StoreType = typeof store;
// export type StateType = ReturnType<typeof store.getState>;