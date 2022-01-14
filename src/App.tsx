import React, {useEffect} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
// import {Conversation} from "./components/Conversation/Conversation";
import {HashRouter, Route} from "react-router-dom";
import {Friends} from "./components/Friends/Friends";
import HeaderContainer from './components/Header/HeaderContainer';
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/LoginComponent/Login";
import {Provider, useDispatch, useSelector} from 'react-redux';
import {initializeTC} from "./Redux/appReducer";
import {AppStateType, store} from "./Redux/reduxStore";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./Hoc/withSuspense";


const Conversation = React.lazy(()=> import ('./components/Conversation/Conversation')
    .then(({Conversation})=>({default:Conversation}))
);

const ProfileContainer = React.lazy(()=> import ('./components/Profile/ProfileContainer')
   );


export function AppContainer() {
    let initialized = useSelector<AppStateType>(state => state.app.initialized)



    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeTC())
    }, [])

    if (!initialized) {
                return <Preloader loading={true}/>}
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav />
                <div className='app-wrapper-content '>

                    <Route path='/conversation' render={withSuspense(Conversation)
                    }/>
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)
                    }/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route exact path='/login' render={() => <Login/>}/>
                    <Route path='/news'/>
                    <Route path='/music'/>
                    <Route path='/settings'/>
                    <Route path='/friends' render={() => <Friends />}/>
                </div>
            </div>

        );
}


export const SamuraiJSApp=()=>{
    return  <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}


