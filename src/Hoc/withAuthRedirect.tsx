import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../Redux/reduxStore";


type mapStateToPropsType={
    isAuth: boolean
}

const mapStateToProps=(state:AppStateType):mapStateToPropsType=> {
    return {
        isAuth: state.auth.isAuth,
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props:mapStateToPropsType)=>{

        let{isAuth, ...restProps}=props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component  {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectComponent
}