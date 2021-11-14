import React from 'react';
import { Field } from 'redux-form';
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Input} from "../common/FormsControls/FormsControls";


const maxLength30 = maxLengthCreator(30)

type CaptchaType={
    captcha: string
}


export function Captcha(props: CaptchaType){
    return( <>
        <Field placeholder={'Captcha'} name={'captcha'} component={Input}
               validate={[requiredField,maxLength30 ]}
        />
        <img src={props.captcha}/>
    </>)
}