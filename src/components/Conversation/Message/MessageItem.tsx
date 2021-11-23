import React from 'react';
import { Redirect } from 'react-router-dom';
import {Field, InjectedFormProps, reduxForm, reset} from 'redux-form';
import style from '../Conversation.module.css'
import {Message} from "../Message";
import {AllMessageType} from "./MessageItemContainer";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {useDispatch} from "react-redux";


export const MessageItem = (props: AllMessageType) => {
    const dispatch=useDispatch()

    let messageElement = props.messagePage.messageData.map(m => <Message key ={m.id} message={m.message}/>)

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageBody)
        dispatch(reset('dialogMessage'))
    }

   if (!props.isAuth) return <Redirect to={'/login'}/>
    return (

        <div className={style.text}>
            <div className={style.dialogs}>

            </div>

            <div className={style.messages}>
                {messageElement}

                <MessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>

    )
}

type FormDataType = {
    newMessageBody: string
}
const maxLength50 = maxLengthCreator(50)
const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> =
    (props) => {


        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field className={style.input} placeholder={'Enter message'} name={'newMessageBody'}
                           component={Textarea}
                           validate={[requiredField,maxLength50 ]}
                    />
                </div>
                <div><button className={style.add}>add text</button></div>



            </form>
        )
    }

const MessageReduxForm = reduxForm<FormDataType>({form: 'dialogMessage' })(AddMessageForm)

