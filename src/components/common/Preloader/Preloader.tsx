import React from 'react';
import preloader from "../../../assets/images/1488.gif";

type PreloaderType ={
    loading: boolean
}


export const Preloader=(props: PreloaderType)=>{
    return <div>
        {props.loading ? <img src={preloader}/> : null}
    </div>
}