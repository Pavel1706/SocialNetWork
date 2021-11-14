import React from 'react';
import k from './Post.module.css';


export type Dreamtype ={

    message : string
    like: number
}

export const Post = (props:Dreamtype) => {
    return (
        <div className={k.since}>
            <img alt={'foto'}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6C1rS1qYf8Z6en9SWnpaIOarrDPK_G66T0Q&usqp=CAU'/>
            {props.message}
            <div>
            {props.like} likes
            </div>

        </div>


    )
}