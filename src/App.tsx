import React, {useEffect} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {Conversation} from "./components/Conversation/Conversation";
import {BrowserRouter, Route} from "react-router-dom";
import {Friends} from "./components/Friends/Friends";
// import {store} from "./Redux/State";
import HeaderContainer from './components/Header/HeaderContainer';
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/LoginComponent/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Provider, useDispatch, useSelector} from 'react-redux';
import {initializeTC} from "./Redux/appReducer";
import {AppStateType} from "./Redux/reduxStore";
import {Preloader} from "./components/common/Preloader/Preloader";
import {store} from "./Redux/reduxStore";
import {ConversationType} from "./Redux/dialogsReducer";





export function AppContainer() {
    let initialized = useSelector<AppStateType>(state => state.app.initialized)
    let dialogsPage = useSelector<AppStateType,ConversationType[]>(state => state.dialogsPage.dialogs)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeTC())
    }, [])

    if (!initialized) {
                return <Preloader loading={true}/>}
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav dialogs={dialogsPage}/>
                <div className='app-wrapper-content '>
                    <Route path='/conversation' render={() => <Conversation/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/news'/>
                    <Route path='/music'/>
                    <Route path='/settings'/>
                    <Route path='/friends' render={() => <Friends dialogs={dialogsPage}/>}/>
                </div>
            </div>

        );
    }

    export const SamuraiJSApp=()=>{
    return  <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
    }


