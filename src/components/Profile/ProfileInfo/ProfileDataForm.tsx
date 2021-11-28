import React from "react";
import {NewProfileType} from "../../../Redux/profileReducer";
import {createField, GetStringKeys, Input, Textarea,} from "../../common/FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import style from "../../LoginComponent/Login.module.css";
import {requiredField} from "../../../utils/validators/validators";
import {AppStateType} from "../../../Redux/reduxStore";
import {connect} from "react-redux";


// type ProfileDataFormType = {
//     data: NewProfileType
//     isOwner: boolean
//     goToEditMode:()=>void
// }


type PropsType = {
    profile: NewProfileType
}

type ProfileTypeKeys = GetStringKeys<NewProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<NewProfileType, PropsType> & PropsType> =
    ({handleSubmit, profile, error}) => {

        return <form onSubmit={handleSubmit}>

            <div>
                <button>save</button>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <b>Full name</b>: {createField<ProfileTypeKeys>('Full name', "fullName", [], Input,)}
            </div>
            <div>
                <b>Looking for a
                    job</b>: {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b>
                {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={style.contact}>
                    <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
                </div>
            })}
            </div>
            <input type='checkbox'/>
        </form>
    }


const ProfileDataFormReduxForm = reduxForm<NewProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm