import React from 'react';
import styles from './FormControls.module.css'
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Field} from "redux-form";


//  const FormControl  = ({...props})=> {
//     let input = props.input
//     let meta = props.meta
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error: '')} >
//             <div>
//                 {props.children}
//             </div>
//             { hasError && <span> {meta.error}</span>}
//         </div>
//     )
// }
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
// export const requiredField = (value:string)=> {
//     if (value) return undefined;
//     return 'Field is required'
// }
//
//
//
// export const maxLengthCreator =(maxLength: number) => (value: string) => {
//     if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
//     return undefined
// }
// const maxLength30 = maxLengthCreator(30)

export const CreateField = (placeholder: string, name:string,
                            validate:[requiredField:any,
                                maxLength30:any],component:any)=>
    <Field placeholder={placeholder} name={name}
                                       validate={[validate]}
                                       component={component}/>