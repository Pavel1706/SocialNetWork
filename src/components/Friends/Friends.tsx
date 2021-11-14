import React from 'react';

import style from './Friend/friends.module.css'
import {ConversationType} from "../../Redux/dialogsReducer";


type ConversationArrayType = {
    dialogs: ConversationType[]
}


export const Friends =(props:ConversationArrayType)=>{

    return(
        <span className={style.avatar} >

            {props.dialogs.map(t=>  <div key={t.id}> <img alt={'foto'} className={style.avatar} src={t.foto} />{t.name}</div> )}

        </span>


    )
}
