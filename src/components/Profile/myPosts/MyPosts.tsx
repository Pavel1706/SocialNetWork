import React, {ChangeEvent} from 'react';
import p from './MyPosts.module.css';
import {Post} from "./Post/Post";

import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import { maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


export const MyPosts = (props: MyPostsPropsType) => {


    let newText = props.profilePage.posts.map(d => <Post key={d.id} message={d.message} like={d.like}/>)
    // let newDreamElement = React.createRef<HTMLTextAreaElement>()
    let onAddPost = (formData: FormDataType) => {

        props.addPost(formData.newPostBody)
    }
    // const newChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //
    //     let text = e.currentTarget.value
    //     console.log(text)
    //     props.updateNewText(text)
    // }


    return (
        <div className={p.since}>
            <h3> My posts </h3>
            {/*{store._state.profilePage.posts.map(t => <div key={t.id}><b>{t.message}</b></div>)}*/}
            <div>
                <PostReduxForm onSubmit={onAddPost}/>
                <div>{newText}</div>
            </div>

            <div className={p.dreams}>

            </div>
        </div>

    )

}

type FormDataType = {
    newPostBody: string
}

const maxLength10 = maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> =
    (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Enter your message'} name={'newPostBody'} component={Textarea}
                           validate={[requiredField,maxLength10 ]}
                    />
                </div>
                <div>
                    <button>add post</button>
                </div>


            </form>
        )
    }

const PostReduxForm = reduxForm<FormDataType>({form: 'postMessage'})(AddPostForm)