import React from 'react';
import styles from './FormControls.module.css'
import {Field} from "redux-form";


export const Textarea = ({...props})=> {
    let input = props.input
    let meta = props.meta
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error: '')} >
            <div>
                <textarea {...props} {...input} {...meta}/>
            </div>
            { hasError && <span> {meta.error}</span>}
        </div>
    )
}


export const Input = ({...props})=> {

    let input = props.input
    let meta = props.meta
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error: '')} >
            <div>
                <input {...props} {...input} {...meta}/>
            </div>
            { hasError && <span> {meta.error}</span>}
        </div>
    )
}


export const CreateField = (placeholder: string, name:string,
                            validate:[requiredField:any,
                                maxLength30:any],component:any)=>
    <Field placeholder={placeholder} name={name}
                                       validate={[validate]}
                                       component={component}/>