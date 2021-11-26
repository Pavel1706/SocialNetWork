import React from 'react';
import style from './Nav.module.css';
import {NavLink} from "react-router-dom";
import {ConversationType} from "../../Redux/dialogsReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";



export const Nav = () => {
    let dialogsPage = useSelector<AppStateType,ConversationType[]>(state => state.dialogsPage.dialogs)

    let fotka = dialogsPage.map(t=> <img key={t.id} className={style.avatar} src={t.foto}/>)
    return (
        <nav className={style.nav}>
            <div className={`${style.sentence} ${style.active}`}>
                <NavLink to="/profile" activeClassName={style.activeLink}>Profile</NavLink>
            </div>
            <div className={style.sentence}>
                <NavLink to="/conversation" activeClassName={style.activeLink}>Messages</NavLink>
            </div>
            <div className={style.sentence}>
                <NavLink to="/news" activeClassName={style.activeLink}>News</NavLink>
            </div>
            <div className={style.sentence}>
                <NavLink to="/music" activeClassName={style.activeLink}>Music</NavLink>
            </div>
            <div className={style.sentence}>
                <NavLink to="/settings" activeClassName={style.activeLink}>Settings</NavLink>
            </div>
            <div className={style.sentence}>
                <NavLink to="/users" activeClassName={style.activeLink}>Users</NavLink>
            </div>
            <div className={style.sentence}>
                <NavLink to="/Friends" className={style.avatar}>Friends</NavLink>
                <div>{fotka}</div>
            </div>
        </nav>
    )
}
