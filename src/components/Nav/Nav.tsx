import React from 'react';
import p from './Nav.module.css';
import {NavLink} from "react-router-dom";
import {ConversationType} from "../../Redux/dialogsReducer";





type ConversationArrayType = {
    dialogs: ConversationType[]
}

export const Nav = (props: ConversationArrayType) => {
    let fotka = props.dialogs.map(t=> <img key={t.id} className={p.avatar} src={t.foto}/>)
    return (
        <nav className={p.nav}>
            <div className={`${p.sentence} ${p.active}`}>
                <NavLink to="/profile" activeClassName={p.activeLink}>Profile</NavLink>
            </div>
            <div className={p.sentence}>
                <NavLink to="/conversation" activeClassName={p.activeLink}>Messages</NavLink>
            </div>
            <div className={p.sentence}>
                <NavLink to="/news" activeClassName={p.activeLink}>News</NavLink>
            </div>
            <div className={p.sentence}>
                <NavLink to="/music" activeClassName={p.activeLink}>Music</NavLink>
            </div>
            <div className={p.sentence}>
                <NavLink to="/settings" activeClassName={p.activeLink}>Settings</NavLink>
            </div>
            <div className={p.sentence}>
                <NavLink to="/users" activeClassName={p.activeLink}>Users</NavLink>
            </div>
            <div className={p.sentence}>
                <NavLink to="/Friends" className={p.avatar}>Friends</NavLink>
                <div>{fotka}</div>
            </div>
        </nav>
    )
}
