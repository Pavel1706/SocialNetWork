import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header} from "./Header";
import {AppStateType} from "../../Redux/reduxStore";
import {connect, useDispatch} from 'react-redux';
import {getAuthTC, LoginOutTC, setUserDataAC} from "../../Redux/authReducer";


type PathParamsType = {
    userId: string

}


export type DataType = {
    id: number | null
    email: string | null
    login: string | null
}
type MapStatePropsType = {
    data: {
        id: number
        email: string
        login: string
    }
    isAuth: boolean

}
type MapDispatchPropsType = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => void

}

type UsersStateType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & UsersStateType

function HeaderContainer(props: PropsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAuthTC())
    }, [])

    const logOut = () => {
        dispatch(LoginOutTC())
    }

    return (
        <Header data={props.data} isAuth={props.isAuth} logout={logOut}/>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    data: state.auth.data,
    isAuth: state.auth.isAuth

})

let WithUrlDataContainerComponent = withRouter(HeaderContainer)


export default connect(mapStateToProps, {
    setUserData: setUserDataAC,
    getLogin: getAuthTC,
    logout: LoginOutTC
})(WithUrlDataContainerComponent)
