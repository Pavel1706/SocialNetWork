import React from "react";
import {NewProfileType} from "../../../Redux/profileReducer";
import {CreateField, Input,} from "../../common/FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import style from "../../LoginComponent/Login.module.css";
import {requiredField} from "../../../utils/validators/validators";

type ProfileDataFormType = {
    data: NewProfileType
    isOwner: boolean
    goToEditMode:()=>void
}


export const ProfileDataForm=(data:ProfileDataFormType)=>{



    return <form >
        {/*<Field className={style.input} placeholder={'Email'} name={'email'}*/}
        {/*       validate={[requiredField,maxLength30 ]}*/}
        {/*       component={Input}/>*/}
       <div><button onClick={data.goToEditMode}>save</button></div>
        <div>
            <b>Full name</b>:   {CreateField('Full name', "fullname", [0,0],{Input}
           )}
        </div>
        <div>
            <b>Looking for a job</b>: {data.data?.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            <b>About me: {data.data.fullName}</b>
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(data.data.contacts).map(key => {
            // return <Contacts key={key} contactTitle={key}
                // contactValue={props.profile?.contacts[key]}
            {/*/>*/}
        })}
        </div>
    </form>
}

// export const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)