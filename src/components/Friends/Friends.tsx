import React from 'react';
import style from './Friend/friends.module.css'
import {ConversationType} from "../../Redux/dialogsReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";




export const Friends =()=>{
    let dialogsPage = useSelector<AppStateType,ConversationType[]>(state => state.dialogsPage.dialogs)
    return(
        <span className={style.avatar} >

            {dialogsPage.map(t=>  <div key={t.id}> <img alt={'foto'} className={style.avatar} src={t.foto} />{t.name}</div> )}

        </span>


    )
}
