import React from 'react';
import {connect} from 'react-redux';
import {
    followAC, followUserTC, getUsersTC,
    setCurrentPageAC, setToggleIsFetchingAC, setToggleIsFollowingAC,
    setUsersAC,
    setUsersTotalCountAC,
    unFollowAC, unFollowUserTC,
    UsersActionsType,
    UserType
} from '../../Redux/usersReducer';
import {AppStateType} from '../../Redux/reduxStore';
import {Users} from './Users';
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../Redux/users-selectors";

export type UsersStateType = {
    usersState: Array<UserType>
    setUsers: (users: Array<UserType>) => void;
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrent: (value: number) => void
    setTotalUsersCount: (value: number) => void
    isFetching: boolean
    setToggleIsFetching: (value: boolean) => void
    setToggleIsFollowing: (value: boolean, userId: number) => void
    followingInProgress: Array<number>
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    followUserTC: (userId: number) => void
    unFollowUserTC: (userId: number) => void
}


class UsersContainer extends React.Component<UsersStateType, {}> {

    componentDidMount() {
        const {currentPage, pageSize}=this.props
        this.props.getUsersThunkCreator(currentPage, pageSize)

    }

    onPageChanged = (pageNumber: number) => {
            const {pageSize}=this.props
        this.props.getUsersThunkCreator(pageNumber, pageSize)

    }


    render() {


        return <>
            <Preloader loading={this.props.isFetching}/>
            <Users onPageChanged={this.onPageChanged}
                   setUsers={this.props.setUsers}
                   currentPage={this.props.currentPage}
                   setCurrent={this.props.setCurrent}
                   setTotalUsersCount={this.props.setTotalUsersCount}
                   totalUsersCount={this.props.totalUsersCount}
                   usersState={this.props.usersState}
                   pageSize={this.props.pageSize}
                   setToggleIsFetching={this.props.setToggleIsFetching}
                   setToggleIsFollowing={this.props.setToggleIsFollowing}
                   followingInProgress={this.props.followingInProgress}
                   followUserTC={this.props.followUserTC}
                   unFollowUserTC={this.props.unFollowUserTC}

            />
        </>
    }
}

// const mapStateToProps = (state: AppStateType) => {
//     return {
//         usersState: state.users.users,
//         pageSize: state.users.pageSize,
//         totalUsersCount: state.users.totalUsersCount,
//         currentPage: state.users.currentPage,
//         isFetching: state.users.isFetching,
//         followingInProgress: state.users.followingInProgress,
//     }
// }

const mapStateToProps = (state: AppStateType) => {
    return {
        usersState: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

const mapDispatchToProps = (dispatch: (action: UsersActionsType) => void) => {
    return {
        followUser: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollowUser: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrent: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        setToggleIsFetching: (loading: boolean) => {
            dispatch(setToggleIsFetchingAC(loading))
        }
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setUsers: setUsersAC,
        setCurrent: setCurrentPageAC,
        setTotalUsersCount: setUsersTotalCountAC,
        setToggleIsFetching: setToggleIsFetchingAC,
        setToggleIsFollowing: setToggleIsFollowingAC,
        getUsersThunkCreator: getUsersTC,
        followUserTC: followUserTC,
        unFollowUserTC: unFollowUserTC,
    }),
    withRouter,
    // withAuthRedirect
)(UsersContainer)
