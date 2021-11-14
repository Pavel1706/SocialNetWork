import React from 'react';
import styles from "../../common/Paginator/Paginator.module.css";

type PaginatorType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (value: number) => void

}


export let Paginator = (props: PaginatorType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return   <div>
            {pages.map(t => {
                return <span className={props.currentPage === t ? styles.selectedPage : ''}
                             onClick={() => {
                                 props.onPageChanged(t)
                             }}>{t}</span>
            })}
        </div>

}
