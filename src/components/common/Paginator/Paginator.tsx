import React, {useState} from 'react';
import styles from "../../common/Paginator/Paginator.module.css";
import cn from "classnames";


type PaginatorType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (value: number) => void
    portionSize: number

}

export let Paginator = (props: PaginatorType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionSize = props.portionSize

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize


    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button className={styles.arrowLeft} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}></button>}
        {pages.filter(p => p >= leftPortionNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({
                    [styles.selectedPage]: props.currentPage === p
                }, styles.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <button className={styles.arrowRight} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}></button>}
    </div>

}
