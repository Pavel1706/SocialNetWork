import React, {useState} from 'react';
import styles from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm, reset} from 'redux-form';
import {Textarea} from "../../common/FormsControls/FormsControls";
import {useDispatch} from "react-redux";


export const MyPosts = (props: MyPostsPropsType) => {
    const dispatch=useDispatch()

    let newText = props.profilePage.posts.map(d => <Post key={d.id} message={d.message} like={d.like}/>)
    let onAddPost = (formData: FormDataType) => {
        props.addPost(formData.newPostBody)
        dispatch(reset('postMessage'))
    }




    return (
        <div className={styles.since}>
            <h3> My posts </h3>
            <div>
                <PostReduxForm onSubmit={onAddPost} />
                <div>{newText}</div>
            </div>

            <div className={styles.dreams}>

            </div>
        </div>

    )

}

type FormDataType = {
    newPostBody: string
}



const AddPostForm: React.FC<InjectedFormProps<FormDataType>> =
    (props) => {

        return (
            <form onSubmit={props.handleSubmit} >
                <div>
                    <Field className={styles.input} placeholder={'Enter your message'} name={'newPostBody'} component={Textarea}

                    />
                </div>
                <div>
                    <button className={styles.button}>add post</button>
                </div>


            </form>
        )
    }

const PostReduxForm = reduxForm<FormDataType>({form: 'postMessage'})(AddPostForm)