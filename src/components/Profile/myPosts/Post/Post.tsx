import React, {useState} from 'react';
import style from './Post.module.css';


export type Posttype ={
    message : string
    like: number
}

export const Post = (props:Posttype) => {
    const [like, setLike]=useState(props.like)



    return (
        <div className={style.since}>
            <img alt={'foto'}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6C1rS1qYf8Z6en9SWnpaIOarrDPK_G66T0Q&usqp=CAU'/>
            {props.message}
            <div >
            <div onClick={()=>{setLike(like+1)}} className={style.like}></div>
                {like}
            </div>

        </div>


    )
}